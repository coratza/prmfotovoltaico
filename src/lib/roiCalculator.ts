// Producibilità per provincia (kWh/kWp/anno)
const PRODUCIBILITA: Record<string, number> = {
  bologna: 1250,
  modena: 1270,
  ferrara: 1230,
  ravenna: 1200,
};

// Autoconsumo per profilo attività
const AUTOCONSUMO_PROFILO: Record<string, number> = {
  diurno: 0.80,
  misto: 0.70,
  h24: 0.65,
};

// CAPEX per scaglione (EUR/kWp)
function capexPerKwp(kwp: number): number {
  if (kwp < 50) return 1200;
  if (kwp < 200) return 1000;
  if (kwp < 500) return 850;
  return 750;
}

// Super ammortamento 180%
const MAGGIORAZIONE = 1.80;
const ALIQUOTA_FISCALE = 0.24;
const ANNI_FRUIZIONE = 10;

const PREZZO_IMMISSIONE = 0.06; // EUR/kWh

export interface CalcoloInput {
  tipologia: "privato" | "azienda";
  provincia: string;
  consumoAnnuo: number; // kWh
  spesaAnnua: number; // EUR
  // Solo aziende
  mqTetto?: number;
  profiloAttivita?: "diurno" | "misto" | "h24";
}

export interface CalcoloOutput {
  kwpCalcolati: number;
  produzioneAnnua: number;
  autoconsumoPct: number;
  autoconsumoKwh: number;
  immissioneKwh: number;
  prezzoEvitato: number;
  capexStimato: number;
  risparmioAnnuo: number;
  ricavoImmissione: number;
  beneficioAnnuo: number;
  paybackAnni: number;
  irrBase: number; // percentuale
  irrMax: number; // percentuale (con 180% per aziende, uguale a irrBase per privati)
  avvisoDati: string | null;
}

// Newton-Raphson per calcolo IRR
function calcolaIRR(cashflows: number[], guess = 0.10, maxIter = 100, tol = 1e-7): number {
  let r = guess;
  for (let i = 0; i < maxIter; i++) {
    let npv = 0;
    let dnpv = 0;
    for (let t = 0; t < cashflows.length; t++) {
      const factor = Math.pow(1 + r, t);
      npv += cashflows[t] / factor;
      if (t > 0) dnpv -= t * cashflows[t] / Math.pow(1 + r, t + 1);
    }
    if (Math.abs(dnpv) < 1e-12) break;
    const rNew = r - npv / dnpv;
    if (Math.abs(rNew - r) < tol) return rNew;
    r = rNew;
  }
  return r;
}

export function calcolaROI(input: CalcoloInput): CalcoloOutput {
  const { tipologia, provincia, consumoAnnuo, spesaAnnua, mqTetto, profiloAttivita } = input;

  const producibilita = PRODUCIBILITA[provincia.toLowerCase()] || 1250;
  let avvisoDati: string | null = null;

  // 1. Dimensionamento kWp
  let kwp: number;
  if (tipologia === "azienda" && mqTetto) {
    kwp = Math.min(mqTetto * 0.18, 1000);
  } else {
    // Privato: dal consumo con leggero sovradimensionamento
    kwp = Math.min((consumoAnnuo / producibilita) * 1.1, 20);
  }

  // 2. Produzione annua
  let produzioneAnnua = kwp * producibilita;

  // 3. Controllo coerenza: produzione > 1.3 * consumo → riduzione
  if (produzioneAnnua > 1.3 * consumoAnnuo) {
    const kwpAdj = (consumoAnnuo / producibilita) * 1.3;
    kwp = Math.min(kwp, kwpAdj);
    produzioneAnnua = kwp * producibilita;
  }

  // 4. Prezzo medio e controllo coerenza
  const prezzoMedio = consumoAnnuo > 0 ? spesaAnnua / consumoAnnuo : 0;
  if (prezzoMedio < 0.08 || prezzoMedio > 0.35) {
    avvisoDati = "I dati inseriti non sembrano coerenti. Ricontrolla il consumo (kWh) e la spesa annua (€) nelle tue bollette.";
  }
  const prezzoEvitato = prezzoMedio * 0.80;

  // 5. Autoconsumo
  const profilo = tipologia === "azienda" && profiloAttivita
    ? (AUTOCONSUMO_PROFILO[profiloAttivita] || 0.70)
    : 0.70; // privati: fisso misto 70%
  const autoconsumoPct = profilo;
  const autoconsumoKwh = Math.min(produzioneAnnua, consumoAnnuo * 0.95) * profilo;
  const immissioneKwh = Math.max(produzioneAnnua - autoconsumoKwh, 0);

  // 6. Beneficio annuo
  const risparmioAnnuo = autoconsumoKwh * prezzoEvitato;
  const ricavoImmissione = immissioneKwh * PREZZO_IMMISSIONE;
  const beneficioAnnuo = risparmioAnnuo + ricavoImmissione;

  // 7. CAPEX
  const euroPerKwp = capexPerKwp(kwp);
  const capexStimato = kwp * euroPerKwp;

  // 8. Payback
  const paybackAnni = beneficioAnnuo > 0 ? capexStimato / beneficioAnnuo : 99;

  // 9. IRR base (25 anni)
  const cfBase: number[] = [-capexStimato];
  for (let t = 1; t <= 25; t++) cfBase.push(beneficioAnnuo);
  const irrBase = calcolaIRR(cfBase) * 100;

  // 10. IRR max (con 180% solo per aziende)
  let irrMax = irrBase;
  if (tipologia === "azienda") {
    const taxTotal = capexStimato * MAGGIORAZIONE * ALIQUOTA_FISCALE;
    const taxAnnual = taxTotal / ANNI_FRUIZIONE;
    const cfMax: number[] = [-capexStimato];
    for (let t = 1; t <= 25; t++) {
      cfMax.push(beneficioAnnuo + (t <= ANNI_FRUIZIONE ? taxAnnual : 0));
    }
    irrMax = calcolaIRR(cfMax) * 100;
  }

  return {
    kwpCalcolati: Math.round(kwp * 10) / 10,
    produzioneAnnua: Math.round(produzioneAnnua),
    autoconsumoPct: Math.round(autoconsumoPct * 100),
    autoconsumoKwh: Math.round(autoconsumoKwh),
    immissioneKwh: Math.round(immissioneKwh),
    prezzoEvitato: Math.round(prezzoEvitato * 1000) / 1000,
    capexStimato: Math.round(capexStimato),
    risparmioAnnuo: Math.round(risparmioAnnuo),
    ricavoImmissione: Math.round(ricavoImmissione),
    beneficioAnnuo: Math.round(beneficioAnnuo),
    paybackAnni: Math.round(paybackAnni * 10) / 10,
    irrBase: Math.round(irrBase * 10) / 10,
    irrMax: Math.round(irrMax * 10) / 10,
    avvisoDati,
  };
}
