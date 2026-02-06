// Producibilità per provincia (kWh/kWp/anno)
const PRODUCIBILITA: Record<string, number> = {
  bologna: 1250,
  modena: 1270,
  ferrara: 1230,
  ravenna: 1200,
};

// Percentuali autoconsumo
const AUTOCONSUMO_PCT: Record<string, Record<string, number>> = {
  privato: { senza: 0.30, con: 0.70 },
  azienda: { senza: 0.50, con: 0.80 },
};

// Costi impianto (EUR)
const COSTO_IMPIANTO: Record<number, number> = {
  3: 6500,
  6: 10500,
};

const COSTO_ACCUMULO = 4500;
const MANUTENZIONE_ANNUA = 100;
const QUOTA_FISSA_PCT = 0.35; // 35% della spesa annua è quota fissa (stima ARERA)
const DEGRADO_ANNUO = 0.005; // 0.5%/anno

// Incentivi
const DETRAZIONE_PRIVATI = 0.50; // 50% in 10 anni
const MAGGIORAZIONE_AZIENDE = 1.80; // 180%
const ALIQUOTA_IRES = 0.28; // 28%

export interface CalcoloInput {
  tipologia: "privato" | "azienda";
  provincia: string;
  tipoImmobile: "casa_singola" | "condominio" | "capannone";
  connessione: "connesso" | "offgrid";
  potenza: 3 | 6;
  accumulo: boolean;
  consumoAnnuo: number; // kWh
  spesaAnnua: number; // EUR
}

export interface CalcoloOutput {
  produzioneAnnua: number;
  autoconsumoPct: number;
  autoconsumoKwh: number;
  prezzoVariabile: number;
  costoLordo: number;
  beneficioIncentivi: number;
  costoNetto: number;
  risparmioAnnuo: number;
  paybackAnni: number;
  roiAnnuo: number;
  risparmio25Anni: number;
}

export function calcolaROI(input: CalcoloInput): CalcoloOutput {
  const { tipologia, provincia, potenza, accumulo, consumoAnnuo, spesaAnnua } = input;

  // 1. Produzione annua
  const producibilita = PRODUCIBILITA[provincia.toLowerCase()] || 1250;
  const produzioneAnnua = potenza * producibilita;

  // 2. Autoconsumo
  const accumuloKey = accumulo ? "con" : "senza";
  const autoconsumoPct = AUTOCONSUMO_PCT[tipologia][accumuloKey];
  const autoconsumoKwh = Math.min(produzioneAnnua * autoconsumoPct, consumoAnnuo);

  // 3. Prezzo variabile dalla bolletta
  const quotaFissa = spesaAnnua * QUOTA_FISSA_PCT;
  const prezzoVariabile = consumoAnnuo > 0 ? (spesaAnnua - quotaFissa) / consumoAnnuo : 0;

  // 4. Risparmio annuo
  const risparmioAnnuo = autoconsumoKwh * prezzoVariabile;

  // 5. Costi
  const costoImpianto = COSTO_IMPIANTO[potenza] || 6500;
  const costoLordo = costoImpianto + (accumulo ? COSTO_ACCUMULO : 0);

  // 6. Incentivi
  let beneficioIncentivi: number;
  if (tipologia === "privato") {
    // Detrazione 50% in 10 anni (valore totale recuperato)
    beneficioIncentivi = costoLordo * DETRAZIONE_PRIVATI;
  } else {
    // Aziende: ammortamento maggiorato al 180%, beneficio = maggiorazione * aliquota IRES
    beneficioIncentivi = costoLordo * MAGGIORAZIONE_AZIENDE * ALIQUOTA_IRES;
  }

  // 7. Costo netto
  const costoNetto = costoLordo - beneficioIncentivi;

  // 8. Payback
  const flussoAnnuo = risparmioAnnuo - MANUTENZIONE_ANNUA;
  const paybackAnni = flussoAnnuo > 0 ? costoNetto / flussoAnnuo : 99;

  // 9. ROI annuo
  const roiAnnuo = costoNetto > 0 ? flussoAnnuo / costoNetto : 0;

  // 10. Risparmio cumulato 25 anni (con degrado)
  let risparmio25Anni = 0;
  for (let anno = 1; anno <= 25; anno++) {
    const degradoFactor = Math.pow(1 - DEGRADO_ANNUO, anno - 1);
    const autoconsumoAnno = Math.min(produzioneAnnua * degradoFactor * autoconsumoPct, consumoAnnuo);
    const risparmioAnno = autoconsumoAnno * prezzoVariabile - MANUTENZIONE_ANNUA;
    risparmio25Anni += risparmioAnno;
  }
  risparmio25Anni -= costoNetto; // netto dell'investimento

  return {
    produzioneAnnua: Math.round(produzioneAnnua),
    autoconsumoPct: Math.round(autoconsumoPct * 100),
    autoconsumoKwh: Math.round(autoconsumoKwh),
    prezzoVariabile: Math.round(prezzoVariabile * 1000) / 1000,
    costoLordo: Math.round(costoLordo),
    beneficioIncentivi: Math.round(beneficioIncentivi),
    costoNetto: Math.round(costoNetto),
    risparmioAnnuo: Math.round(risparmioAnnuo),
    paybackAnni: Math.round(paybackAnni * 10) / 10,
    roiAnnuo: Math.round(roiAnnuo * 1000) / 10,
    risparmio25Anni: Math.round(risparmio25Anni),
  };
}
