import { FAQItem } from "@/components/seo/SEOFAQ";
import { CorrelatoLink } from "@/components/seo/ApprofondimentiCorrelati";

export interface BlogSection {
  h2: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogArticle {
  slug: string;
  title: string; // SEO title
  metaDescription: string;
  h1: string;
  category: string;
  readingTime: number; // minutes
  publishedISO: string;
  updatedISO: string;
  cover: string; // image path
  excerpt: string;
  intro: string;
  sections: BlogSection[];
  faqs: FAQItem[];
  correlati: CorrelatoLink[];
  keywords: string;
}

import heroSolar from "@/assets/hero-solar-home.jpg";
import industrial from "@/assets/industrial-solar.jpg";
import pannelli from "@/assets/pannelli-dettaglio.jpg";
import bolognaCover from "@/assets/hero-bologna-rooftop.jpg";
import ingegnere from "@/assets/ingegnere-cantiere.jpg";

export const blogArticles: BlogArticle[] = [
  {
    slug: "conviene-fotovoltaico",
    title: "Conviene il Fotovoltaico nel 2026? Analisi Reale",
    metaDescription:
      "Conviene installare il fotovoltaico nel 2026? Analisi obiettiva su risparmio reale, tempo di ritorno e agevolazioni per case e aziende.",
    h1: "Conviene il fotovoltaico nel 2026? Analisi obiettiva",
    category: "Guide",
    readingTime: 7,
    publishedISO: "2026-07-08",
    updatedISO: "2026-07-08",
    cover: heroSolar,
    excerpt:
      "Con il costo dell'energia stabilizzato su valori più alti del pre-crisi e le detrazioni fiscali al 50% confermate, il fotovoltaico rimane uno degli investimenti privati più solidi. Ecco quando conviene davvero e quando no.",
    intro:
      "La domanda \"conviene il fotovoltaico?\" è la prima che ci fanno tutti i clienti in sopralluogo. La risposta onesta è: dipende. Dipende dai tuoi consumi, dal tuo tetto, da quanto tempo pensi di restare in quella casa e dalla tua tolleranza a un investimento con ritorno a medio termine. In questo articolo mettiamo in fila i numeri veri, senza esagerazioni e senza sminuire.",
    sections: [
      {
        h2: "Il costo dell'energia oggi",
        paragraphs: [
          "Nel 2026 il prezzo medio dell'energia elettrica per il cliente domestico tipo si aggira intorno a 0,28-0,32 €/kWh sul mercato libero, con tariffe fisse leggermente più basse ma vincolate. Rispetto ai 0,20 €/kWh medi del 2019, siamo su un +50% strutturale. Questo cambia radicalmente la matematica del fotovoltaico: quello che nel 2019 rientrava in 10-12 anni oggi rientra in 6-8.",
        ],
      },
      {
        h2: "Quanto risparmia davvero una famiglia?",
        paragraphs: [
          "Prendiamo una famiglia di 4 persone in Emilia-Romagna, consumo annuo 4.500 kWh, bolletta media 1.400 € l'anno. Con un impianto da 6 kW senza accumulo, l'autoconsumo istantaneo è tipicamente del 30-40%: significa consumare direttamente circa 1.500 kWh e vendere in rete i restanti 5.700. Il risparmio effettivo (autoconsumo + Scambio sul Posto) si attesta su 900-1.100 € l'anno.",
          "Con l'aggiunta di un accumulo da 5-10 kWh l'autoconsumo sale al 70-80% e il risparmio arriva a 1.500-1.800 € l'anno. L'accumulo costa in più 4.000-6.000 €, ma con detrazione al 50% e prezzi dell'energia elevati il tempo di ritorno resta sui 7-8 anni.",
        ],
      },
      {
        h2: "Quando NON conviene",
        paragraphs: [
          "Se consumi meno di 2.000 kWh l'anno (single, coppia senza figli, seconda casa poco utilizzata) l'investimento fa più fatica a rientrare. Se pensi di vendere casa entro 3-5 anni, difficilmente recuperi tutto tramite il maggior valore immobiliare (che comunque cresce del 3-8%). Se il tetto è totalmente nord o pesantemente ombreggiato, meglio investire i soldi altrove.",
        ],
      },
      {
        h2: "L'investimento in numeri",
        paragraphs: [
          "Un impianto da 6 kW con accumulo 5 kWh a Bologna costa circa 13.500-15.000 € chiavi in mano. Con detrazione 50% recuperi 6.750-7.500 € in 10 anni. Il risparmio in bolletta è di 1.500-1.800 € l'anno. Il tempo di ritorno effettivo, considerando detrazione e risparmio, è di 6-8 anni. Nei successivi 15-20 anni di vita utile l'impianto ti fa guadagnare 20.000-30.000 €.",
        ],
      },
    ],
    faqs: [
      {
        question: "Il fotovoltaico conviene anche senza accumulo?",
        answer:
          "Sì, se i consumi sono ben distribuiti nella giornata o se hai elettrodomestici programmabili (lavatrice, lavastoviglie, climatizzazione). Senza accumulo il tempo di ritorno è di 7-9 anni.",
      },
      {
        question: "Il valore della casa aumenta con il fotovoltaico?",
        answer:
          "Sì, mediamente del 3-8% secondo studi immobiliari recenti. Un impianto attivo con classe energetica migliorata è oggi un forte fattore di preferenza per gli acquirenti.",
      },
      {
        question: "Quanto influisce l'aumento futuro dei costi energetici?",
        answer:
          "Ogni +10% del costo energia riduce il tempo di ritorno di circa 6-8 mesi. Con lo scenario energetico attuale il fotovoltaico è una copertura naturale contro futuri aumenti tariffari.",
      },
      {
        question: "L'accumulo è sempre consigliato?",
        answer:
          "No. Se i consumi sono concentrati in orario diurno (smart working, pensionati, aziende) l'accumulo aggiunge poco. Se invece la casa è vuota di giorno, l'accumulo è quasi indispensabile per massimizzare l'autoconsumo.",
      },
      {
        question: "E se cambio casa?",
        answer:
          "L'impianto resta legato all'immobile e ne aumenta il valore di vendita. Le detrazioni residue si trasferiscono al nuovo proprietario (salvo diversa scelta dichiarata nel rogito).",
      },
      {
        question: "Serve una manutenzione costosa?",
        answer:
          "No. Un controllo annuo (100-200 €) e la pulizia dei pannelli ogni 2-3 anni bastano. L'inverter va sostituito una volta dopo 12-15 anni (1.000-2.000 €).",
      },
    ],
    correlati: [
      { title: "Quanto costa un impianto", description: "Prezzi reali per taglia e tipologia", href: "/blog/quanto-costa-impianto-fotovoltaico" },
      { title: "ROI fotovoltaico", description: "Come calcolare il ritorno dell'investimento", href: "/blog/roi-fotovoltaico" },
      { title: "Accumulo sì o no?", description: "Guida alla scelta dell'accumulo", href: "/blog/accumulo-fotovoltaico-conviene" },
      { title: "Calcola il tuo risparmio", description: "Simulatore online personalizzato", href: "/calcola-rendimento" },
    ],
    keywords: "conviene fotovoltaico 2026, fotovoltaico conviene, risparmio fotovoltaico, investimento fotovoltaico",
  },
  {
    slug: "quanto-costa-impianto-fotovoltaico",
    title: "Quanto Costa un Impianto Fotovoltaico? Prezzi 2026",
    metaDescription:
      "Prezzi reali di un impianto fotovoltaico nel 2026: 3 kW, 6 kW, con e senza accumulo. Cosa incide sul costo e come confrontare i preventivi.",
    h1: "Quanto costa un impianto fotovoltaico nel 2026?",
    category: "Prezzi",
    readingTime: 6,
    publishedISO: "2026-07-08",
    updatedISO: "2026-07-08",
    cover: pannelli,
    excerpt:
      "Prezzi trasparenti per taglia, con e senza accumulo, e le voci nascoste che fanno la differenza tra un preventivo serio e uno gonfiato.",
    intro:
      "\"Quanto costa un impianto fotovoltaico?\" è la seconda domanda dopo \"conviene?\". La risposta breve: dipende da taglia, componenti, accumulo e complessità del tetto. La risposta lunga la trovi qui sotto con i prezzi reali che pratichiamo in Emilia-Romagna nel 2026.",
    sections: [
      {
        h2: "Prezzi indicativi per taglia (senza accumulo)",
        paragraphs: [
          "Un impianto residenziale chiavi in mano, IVA agevolata al 10% e pratiche GSE incluse, ha oggi prezzi di mercato che si posizionano nelle fasce seguenti. Sono benchmark minimi: prezzi molto più bassi normalmente indicano compromessi su componenti, garanzie o servizio di installazione.",
        ],
        bullets: [
          "3 kW: a partire da 6.500 € — ideale per famiglie con consumi 2.500-3.500 kWh/anno",
          "4,5 kW: a partire da 8.000 € — buon compromesso per case medie",
          "6 kW: a partire da 9.500 € — taglia più diffusa per famiglie di 4 persone",
          "10 kW: a partire da 14.500 € — case grandi con auto elettrica o pompa di calore",
          "20 kW: a partire da 22.000 € — piccole attività commerciali o ville importanti",
        ],
      },
      {
        h2: "Aggiungere l'accumulo: quanto costa",
        paragraphs: [
          "Un sistema di accumulo (batteria al litio) ha oggi un costo di 700-900 € per kWh utile, installazione inclusa. Le taglie più diffuse per il residenziale sono 5, 7,5 e 10 kWh.",
        ],
        bullets: [
          "Accumulo 5 kWh: +4.000-4.500 € — copre il fabbisogno serale di una famiglia media",
          "Accumulo 10 kWh: +7.500-8.500 € — copre anche notte + eventi di picco",
        ],
      },
      {
        h2: "Cosa fa variare il prezzo",
        paragraphs: [
          "A parità di taglia, il costo finale dipende da: qualità dei pannelli (marche europee vs. asiatiche di primo livello vs. gamma economica), inverter (ibrido o tradizionale, marca), tipo di tetto (falda tradizionale vs. tetto piano che richiede zavorre, coppo vs. tegola), presenza di ostacoli (camini, abbaini, ombre), altezza dell'edificio (ponteggi), lunghezza dei cablaggi tra pannelli e quadro elettrico, monitoraggio remoto e app.",
        ],
      },
      {
        h2: "Come confrontare i preventivi (senza farsi fregare)",
        paragraphs: [
          "Un preventivo serio deve specificare: marca e modello di pannelli e inverter, garanzie sulla produzione (25-30 anni sui pannelli lineari), inclusione o meno di pratiche GSE, verifica strutturale, ponteggi, sicurezza cantiere, iva applicata, tempi di intervento, presenza di monitoraggio, condizioni di assistenza post-vendita. Diffida da preventivi generici tipo \"impianto 6 kW a 7.000 €\" senza dettaglio dei componenti.",
        ],
      },
    ],
    faqs: [
      {
        question: "Quanto costa un impianto da 3 kW nel 2026?",
        answer:
          "Un 3 kW chiavi in mano parte da circa 6.500 €, IVA al 10% e pratiche GSE incluse. Con accumulo da 5 kWh il totale sale a circa 10.500-11.000 €.",
      },
      {
        question: "L'IVA è al 10% o al 22%?",
        answer:
          "Per la prima installazione su abitazione l'IVA è al 10% agevolata. Per le aziende è al 22% ma detraibile.",
      },
      {
        question: "Sono compresi i costi di allacciamento?",
        answer:
          "Nei nostri preventivi sì. Includiamo pratica e-distribuzione (che ha un costo fisso di circa 100-150 €) e pratica GSE.",
      },
      {
        question: "Le detrazioni sono già scontate dal prezzo?",
        answer:
          "No. Le detrazioni fiscali del 50% le recuperi in 10 anni tramite dichiarazione dei redditi. Il prezzo che paghi è quello di listino; poi ogni anno detrai il 5% del costo per 10 anni.",
      },
      {
        question: "Come funziona lo Sconto in Fattura?",
        answer:
          "Al momento la cessione del credito e lo sconto in fattura non sono più applicabili al fotovoltaico residenziale con detrazione 50%. Restano attive solo le detrazioni tradizionali in dichiarazione.",
      },
      {
        question: "Posso pagare a rate?",
        answer:
          "Sì, offriamo finanziamenti dedicati fino a 120 mesi con istituti convenzionati. Le rate mensili sono spesso allineate al risparmio in bolletta, di fatto autofinanziando l'impianto.",
      },
    ],
    correlati: [
      { title: "Conviene il fotovoltaico?", description: "Analisi obiettiva della convenienza", href: "/blog/conviene-fotovoltaico" },
      { title: "Accumulo sì o no?", description: "Come decidere se serve la batteria", href: "/blog/accumulo-fotovoltaico-conviene" },
      { title: "Detrazioni Privati", description: "Come recuperare il 50%", href: "/agevolazioni/detrazioni-privati" },
      { title: "Calcola preventivo", description: "Stima online in 2 minuti", href: "/calcola-rendimento" },
    ],
    keywords: "quanto costa impianto fotovoltaico, prezzo fotovoltaico 2026, costo impianto 6 kW, prezzo pannelli solari",
  },
  {
    slug: "accumulo-fotovoltaico-conviene",
    title: "Accumulo Fotovoltaico: Conviene o No? Guida 2026",
    metaDescription:
      "Accumulo per fotovoltaico: quando conviene, quanto costa e come dimensionarlo. Guida pratica per famiglie e piccole aziende.",
    h1: "Accumulo per il fotovoltaico: conviene davvero?",
    category: "Tecnologia",
    readingTime: 6,
    publishedISO: "2026-07-08",
    updatedISO: "2026-07-08",
    cover: pannelli,
    excerpt:
      "Le batterie al litio hanno rivoluzionato l'autoconsumo, ma non sono la soluzione giusta per tutti. Ecco quando vale la pena aggiungerle e quando no.",
    intro:
      "L'accumulo è la tecnologia più discussa del settore. Rende l'impianto molto più efficiente, ma aumenta il costo iniziale del 30-50%. La domanda \"mi conviene?\" ha una risposta che dipende da un solo fattore: quando consumi l'energia.",
    sections: [
      {
        h2: "Come funziona un accumulo",
        paragraphs: [
          "L'accumulo è una batteria al litio (LFP nella maggior parte dei casi moderni) che immagazzina l'energia prodotta dal fotovoltaico durante il giorno e la restituisce quando serve — tipicamente sera e notte. Senza accumulo, l'energia prodotta e non consumata immediatamente viene venduta alla rete a un prezzo (Scambio sul Posto) inferiore a quello di acquisto. Con l'accumulo la usi tu, alla tariffa piena.",
        ],
      },
      {
        h2: "Quando conviene",
        paragraphs: [
          "L'accumulo conviene quando l'autoconsumo istantaneo (senza batteria) è basso, cioè quando la casa è vuota di giorno. È il caso di famiglie che lavorano fuori casa, di seconde case utilizzate solo nei weekend o in estate, di abitazioni con consumi concentrati in orario serale (cena, lavastoviglie, televisione, aria condizionata).",
        ],
        bullets: [
          "Famiglia con lavoro fuori casa (rientro alle 18-19): accumulo consigliato",
          "Pensionati o smart worker con consumi diurni: accumulo opzionale",
          "Seconda casa mare/montagna: accumulo utile per weekend",
          "Casa con auto elettrica ricaricata di notte: accumulo strategico",
        ],
      },
      {
        h2: "Quando NON conviene",
        paragraphs: [
          "Se già senza batteria l'autoconsumo supera il 50-60% (grazie a consumi diurni concentrati o programmazione elettrodomestici), aggiungere l'accumulo dà un beneficio marginale. In quel caso conviene investire quei 4.000-8.000 € in ampliamento dell'impianto o in efficienza energetica (isolamento, infissi).",
        ],
      },
      {
        h2: "Come dimensionarlo",
        paragraphs: [
          "La regola pratica: la capacità dell'accumulo dovrebbe coprire il consumo serale medio della casa, tipicamente 5-8 kWh per una famiglia di 4 persone. Sovradimensionare la batteria è quasi sempre un errore economico: parti della capacità non verranno mai utilizzate e il tempo di ritorno peggiora.",
        ],
      },
    ],
    faqs: [
      {
        question: "Quanto costa un accumulo da 5 kWh?",
        answer:
          "Installato, tra 4.000 e 4.500 € nel 2026. La detrazione fiscale del 50% si applica anche all'accumulo se contestuale all'impianto fotovoltaico.",
      },
      {
        question: "Quanto dura una batteria al litio?",
        answer:
          "Le batterie LFP moderne garantiscono 6.000-10.000 cicli di carica/scarica, corrispondenti a 15-20 anni di uso residenziale. La garanzia standard è di 10 anni con capacità residua ≥ 80%.",
      },
      {
        question: "Posso aggiungere l'accumulo a un impianto già esistente?",
        answer:
          "Sì, con un accumulo AC-coupled (che si aggiunge lato uscita dell'inverter). Il retrofit è più costoso di un impianto nativo ibrido ma è tecnicamente semplice.",
      },
      {
        question: "L'accumulo funziona anche in blackout?",
        answer:
          "Solo se dotato di funzione backup/EPS. Non tutti gli inverter la offrono di serie. Se ti serve continuità elettrica in caso di blackout, chiedi esplicitamente un sistema con EPS.",
      },
      {
        question: "Devo dichiarare l'accumulo?",
        answer:
          "Sì, va comunicato a GSE contestualmente all'impianto (o con variante se aggiunto in seguito). Ce ne occupiamo noi con la pratica burocratica.",
      },
      {
        question: "Ci sono incentivi specifici per l'accumulo?",
        answer:
          "In Italia l'accumulo rientra nella stessa detrazione al 50% del fotovoltaico se installato contestualmente. In alcune regioni sono attivi bandi periodici aggiuntivi.",
      },
    ],
    correlati: [
      { title: "Quanto costa un impianto", description: "Prezzi con e senza accumulo", href: "/blog/quanto-costa-impianto-fotovoltaico" },
      { title: "Conviene il fotovoltaico?", description: "Analisi convenienza generale", href: "/blog/conviene-fotovoltaico" },
      { title: "ROI fotovoltaico", description: "Calcolo del ritorno investimento", href: "/blog/roi-fotovoltaico" },
      { title: "Calcola il tuo risparmio", description: "Simulatore online", href: "/calcola-rendimento" },
    ],
    keywords: "accumulo fotovoltaico, batteria fotovoltaico, accumulo conviene, batteria al litio fotovoltaico",
  },
  {
    slug: "incentivi-fotovoltaico-aziende",
    title: "Incentivi Fotovoltaico Aziende 2026: Guida Completa",
    metaDescription:
      "Incentivi fotovoltaico aziende 2026: ammortamento, credito d'imposta Transizione 5.0, PSR e detrazioni. Guida operativa per imprese.",
    h1: "Incentivi fotovoltaico per aziende: la guida 2026",
    category: "Aziende",
    readingTime: 7,
    publishedISO: "2026-07-08",
    updatedISO: "2026-07-08",
    cover: industrial,
    excerpt:
      "Ammortamento accelerato, Transizione 5.0, bandi regionali e Superbonus imprese: la mappa completa degli incentivi per l'installazione fotovoltaica su capannoni e attività.",
    intro:
      "Per le aziende il fotovoltaico è oggi uno degli investimenti più redditizi disponibili: costo dell'energia elettrica industriale ancora elevato, sistema di incentivi articolato e disponibilità di tetti industriali ampi. In questa guida mettiamo in fila gli strumenti attivi nel 2026.",
    sections: [
      {
        h2: "Ammortamento fiscale ordinario",
        paragraphs: [
          "L'impianto fotovoltaico è un bene strumentale ammortizzabile. Per le imprese l'aliquota di ammortamento standard è del 9% annuo (durata teorica 11-12 anni). L'IVA al 22% è integralmente detraibile.",
        ],
      },
      {
        h2: "Credito d'imposta Transizione 5.0",
        paragraphs: [
          "Il piano Transizione 5.0 prevede un credito d'imposta significativo per investimenti in beni strumentali che riducono i consumi energetici dei processi produttivi di almeno il 3-5%. Il fotovoltaico rientra tra i beni ammissibili se abbinato a un intervento di digitalizzazione o efficientamento del processo produttivo (ad esempio sostituzione di macchinari energivori).",
          "L'aliquota base parte dal 5% ma può salire fino al 45% per gli investimenti più impattanti sulla riduzione dei consumi. La certificazione è demandata a un tecnico abilitato.",
        ],
      },
      {
        h2: "PSR per aziende agricole",
        paragraphs: [
          "Le aziende agricole in Emilia-Romagna hanno accesso periodico a bandi PSR (Programma di Sviluppo Rurale) che finanziano fino al 60-70% dell'investimento fotovoltaico per impianti su strutture aziendali (stalle, capannoni agricoli, fienili). I bandi hanno finestre di apertura specifiche: monitoriamo per i nostri clienti agricoli le uscite regionali.",
        ],
      },
      {
        h2: "Detrazione 50% per micro imprese e professionisti",
        paragraphs: [
          "I professionisti e le micro imprese individuali che installano fotovoltaico su un immobile a uso promiscuo (studio + abitazione) possono accedere alla detrazione al 50% per la quota residenziale.",
        ],
      },
      {
        h2: "Comunità Energetiche Rinnovabili (CER)",
        paragraphs: [
          "Le CER permettono a più utenti (aziende, privati, PA) di condividere l'energia prodotta all'interno della stessa cabina primaria, accedendo a incentivi GSE aggiuntivi (110-120 €/MWh per 20 anni sull'energia condivisa). Un'azienda può essere il produttore principale di una CER, generando ricavi aggiuntivi rispetto al puro autoconsumo.",
        ],
      },
    ],
    faqs: [
      {
        question: "Un'azienda può cumulare più incentivi?",
        answer:
          "Sì, con regole precise. Ammortamento fiscale e detraibilità IVA sono sempre applicabili. Il credito d'imposta Transizione 5.0 è cumulabile con altri incentivi entro determinati massimali. I bandi PSR sono in genere alternativi ad altri incentivi sullo stesso intervento.",
      },
      {
        question: "Quanto ci si mette a rientrare?",
        answer:
          "Con l'attuale costo dell'energia industriale (0,20-0,25 €/kWh), impianti aziendali medi (30-100 kW) hanno tempi di ritorno di 4-6 anni. Con incentivi Transizione 5.0 o PSR il tempo scende a 3-4 anni.",
      },
      {
        question: "Serve una perizia tecnica per gli incentivi?",
        answer:
          "Per Transizione 5.0 sì: è necessaria certificazione ex ante ed ex post di tecnico abilitato. Per l'ammortamento standard no. Per bandi PSR variano i requisiti caso per caso.",
      },
      {
        question: "Il fotovoltaico su un capannone in leasing è finanziabile?",
        answer:
          "Sì, con formule dedicate: leasing operativo dell'impianto, finanziamento bancario, o intervento diretto della società di leasing sull'immobile. Analizziamo caso per caso la soluzione fiscalmente più vantaggiosa.",
      },
      {
        question: "Cos'è una CER e come partecipare?",
        answer:
          "Una Comunità Energetica Rinnovabile è un soggetto giuridico che condivide energia rinnovabile prodotta localmente. Un'azienda può fondarne una o entrare in una esistente. Serve un'analisi preliminare della cabina primaria di appartenenza (che effettuiamo noi in fase di studio).",
      },
      {
        question: "Che tempi di installazione per un impianto industriale?",
        answer:
          "Per un impianto da 100 kW mediamente 4-8 settimane dalla firma del contratto, incluse pratiche autorizzative. Impianti più grandi (200-500 kW) richiedono 2-4 mesi.",
      },
    ],
    correlati: [
      { title: "Fotovoltaico Aziende", description: "Impianti industriali su misura", href: "/fotovoltaico-aziende" },
      { title: "Agevolazioni Aziende", description: "Dettaglio completo incentivi imprese", href: "/agevolazioni/agevolazioni-aziende" },
      { title: "ROI fotovoltaico", description: "Come si calcola il rendimento", href: "/blog/roi-fotovoltaico" },
      { title: "Quanto costa un impianto", description: "Prezzi per taglia", href: "/blog/quanto-costa-impianto-fotovoltaico" },
    ],
    keywords: "incentivi fotovoltaico aziende, transizione 5.0 fotovoltaico, ammortamento fotovoltaico azienda, PSR fotovoltaico",
  },
  {
    slug: "roi-fotovoltaico",
    title: "ROI Fotovoltaico: Come si Calcola il Rendimento",
    metaDescription:
      "Come si calcola il ROI di un impianto fotovoltaico: formula, esempi reali per 3-6-10 kW e fattori che influenzano il tempo di ritorno.",
    h1: "ROI del fotovoltaico: come calcolarlo davvero",
    category: "Finanza",
    readingTime: 6,
    publishedISO: "2026-07-08",
    updatedISO: "2026-07-08",
    cover: ingegnere,
    excerpt:
      "Il tempo di ritorno di un impianto fotovoltaico dipende da variabili concrete: consumi, tariffa, autoconsumo, detrazioni. Ecco la formula e tre esempi calcolati.",
    intro:
      "Il ROI (Return On Investment) è il modo corretto per valutare un impianto fotovoltaico. Non basta guardare al risparmio in bolletta: bisogna considerare il costo totale (netto detrazioni), il flusso di cassa nel tempo, la vita utile dei componenti. Vediamo come si fa il calcolo.",
    sections: [
      {
        h2: "La formula base",
        paragraphs: [
          "Tempo di ritorno (payback) = Investimento netto ÷ Beneficio annuo. Investimento netto = costo impianto − detrazioni recuperate (in valore attuale). Beneficio annuo = (energia autoconsumata × tariffa evitata) + (energia immessa × prezzo Scambio sul Posto).",
        ],
      },
      {
        h2: "Esempio 1: 3 kW residenziale senza accumulo",
        paragraphs: [
          "Famiglia consumo 3.500 kWh/anno. Impianto 3 kW che produce 3.600 kWh/anno. Autoconsumo istantaneo: 30% (1.080 kWh). Immesso in rete: 2.520 kWh. Risparmio annuo: 1.080 × 0,30 + 2.520 × 0,10 = 324 + 252 = 576 €. Costo impianto: 6.500 €. Detrazione recuperata: 3.250 € in 10 anni. Investimento netto attualizzato: circa 4.000 €. Payback: 7 anni. Vita residua produttiva: 18-23 anni.",
        ],
      },
      {
        h2: "Esempio 2: 6 kW residenziale con accumulo 5 kWh",
        paragraphs: [
          "Famiglia consumo 4.500 kWh/anno. Impianto 6 kW che produce 7.200 kWh/anno. Autoconsumo con accumulo: 75% (5.400 kWh). Immesso in rete: 1.800 kWh. Risparmio annuo: 5.400 × 0,30 + 1.800 × 0,10 = 1.620 + 180 = 1.800 €. Costo impianto: 13.500 €. Detrazione: 6.750 € in 10 anni. Investimento netto attualizzato: circa 8.500 €. Payback: 5 anni. Vita residua produttiva: 20 anni.",
        ],
      },
      {
        h2: "Esempio 3: 30 kW capannone artigiano",
        paragraphs: [
          "Azienda consumo 45.000 kWh/anno, tariffa industriale 0,22 €/kWh. Impianto 30 kW che produce 36.000 kWh/anno. Autoconsumo diurno: 85% (30.600 kWh). Immesso: 5.400 kWh. Risparmio annuo: 30.600 × 0,22 + 5.400 × 0,08 = 6.732 + 432 = 7.164 €. Costo impianto: 33.000 €. IVA detraibile + ammortamento 9%/anno. Payback effettivo: 4-5 anni. Vita residua utile: 20 anni.",
        ],
      },
      {
        h2: "Variabili che spostano il ROI",
        paragraphs: [
          "Il ROI migliora quando: la tariffa energetica sale (ogni +10% riduce il payback di 6-8 mesi), l'autoconsumo aumenta (accumulo, programmazione), l'impianto è ben orientato, i costi manutentivi restano bassi. Peggiora quando: ombreggiamento non previsto, degrado prematuro inverter, sostituzione anticipata batterie, aumento tasse di rete.",
        ],
      },
    ],
    faqs: [
      {
        question: "Qual è il ROI medio di un fotovoltaico residenziale?",
        answer:
          "Con i prezzi energia attuali, il payback è di 5-8 anni per impianti residenziali con detrazioni. Il ROI su 25 anni è mediamente del 200-350%.",
      },
      {
        question: "L'inflazione energetica migliora il ROI?",
        answer:
          "Sì. Ogni aumento della tariffa elettrica futura rende l'impianto più conveniente. Il fotovoltaico è di fatto una copertura naturale contro l'inflazione energetica.",
      },
      {
        question: "Come cambia il ROI con l'auto elettrica?",
        answer:
          "Migliora significativamente. Ricaricare l'auto in orario diurno con energia autoprodotta a costo zero rispetto a 0,30 €/kWh dalla rete accelera il payback di 12-24 mesi.",
      },
      {
        question: "Devo attualizzare i flussi di cassa?",
        answer:
          "Idealmente sì. Un calcolo rigoroso attualizza i risparmi futuri con un tasso del 2-3% annuo. In prima approssimazione, per un impianto residenziale, il payback non attualizzato è sufficientemente affidabile.",
      },
      {
        question: "Il valore residuo dell'impianto conta?",
        answer:
          "Sì. Dopo 25 anni un impianto ancora funzionante ha valore, sia come continuazione della produzione sia come valorizzazione dell'immobile.",
      },
      {
        question: "Vale la pena fare un business plan dettagliato?",
        answer:
          "Per impianti aziendali sì. Per il residenziale un calcolo semplificato è sufficiente. Nel sopralluogo forniamo sempre una simulazione economica dedicata al tuo profilo.",
      },
    ],
    correlati: [
      { title: "Conviene il fotovoltaico?", description: "Analisi obiettiva della convenienza", href: "/blog/conviene-fotovoltaico" },
      { title: "Quanto costa un impianto", description: "Prezzi per taglia e configurazione", href: "/blog/quanto-costa-impianto-fotovoltaico" },
      { title: "Calcola il tuo rendimento", description: "Simulatore ROI personalizzato", href: "/calcola-rendimento" },
      { title: "Incentivi Aziende", description: "Tutti gli incentivi per imprese", href: "/blog/incentivi-fotovoltaico-aziende" },
    ],
    keywords: "ROI fotovoltaico, rendimento fotovoltaico, tempo di ritorno fotovoltaico, payback fotovoltaico",
  },
];

export const getArticleBySlug = (slug: string) => blogArticles.find((a) => a.slug === slug);
