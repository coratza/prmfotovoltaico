import { CityPageData } from "@/components/seo/CityFotovoltaicoTemplate";
import heroBologna from "@/assets/hero-bologna-rooftop.jpg";
import heroDefault from "@/assets/hero-solar-home.jpg";

export const bolognaData: CityPageData = {
  city: "Bologna",
  slug: "fotovoltaico-bologna",
  provinciaSigla: "BO",
  title: "Fotovoltaico Bologna | Impianti Chiavi in Mano PRM",
  description:
    "Impianti fotovoltaici a Bologna e provincia: progettazione ingegneristica, installazione certificata e pratiche GSE. Sopralluogo gratuito con l'Ing. Navone.",
  keywords: "fotovoltaico Bologna, impianti fotovoltaici Bologna, pannelli solari Bologna, installatore fotovoltaico Bologna",
  h1: "Impianti fotovoltaici a Bologna",
  heroSubtitle:
    "Progetto, installazione e assistenza per famiglie e imprese in tutta la provincia di Bologna. Un solo interlocutore: l'ingegnere che segue il tuo impianto.",
  heroImage: heroBologna,
  irraggiamento: "1.380 kWh/m²",
  produzioneKwhAnnoPer1kw: 1200,
  areeServite: [
    "Bologna centro", "San Lazzaro di Savena", "Casalecchio di Reno", "Castenaso",
    "Zola Predosa", "Pianoro", "Sasso Marconi", "Imola", "San Giovanni in Persiceto",
  ],
  intro:
    "Bologna è una delle città con il miglior rapporto tra costo dell'energia e resa fotovoltaica del Nord Italia. La combinazione di 1.380 kWh/m² di irraggiamento annuo e le tariffe elettriche in costante crescita rende l'investimento in un impianto solare uno dei più solidi disponibili oggi per un proprietario di casa o un piccolo imprenditore. Un impianto residenziale da 6 kW installato a Bologna produce mediamente 7.200 kWh l'anno, coprendo il 70-80% dei consumi di una famiglia di 4 persone e generando un risparmio effettivo di 1.500-2.000 € annui sulla bolletta.",
  contestoLocale:
    "Il patrimonio edilizio bolognese è eterogeneo: dalle bifamiliari degli anni '70 in prima cintura, alle nuove costruzioni classe A nel quartiere Navile, fino agli edifici in centro storico soggetti a vincolo. Ogni tipologia richiede un approccio diverso — pannelli integrati per i tetti a falda tradizionali, soluzioni non complanari per i tetti piani, dimensionamento con accumulo per le famiglie con consumi serali elevati. A Bologna lavoriamo prevalentemente su tetti in coppo (falda a 25-30°) esposti tra sud-est e sud-ovest, condizioni ideali per massimizzare la producibilità.",
  perchePrm:
    "PRM Fotovoltaico ha sede a San Lazzaro di Savena, alle porte di Bologna. Questo significa tempi di intervento rapidi (sopralluogo in 48 ore, assistenza post-installazione in giornata) e conoscenza diretta dei regolamenti edilizi comunali di Bologna, dei comuni della prima cintura e dell'imolese. Ogni progetto è firmato personalmente dall'Ing. Riccardo Navone, che segue la commessa dal primo contatto fino al collaudo GSE.",
  faqs: [
    {
      question: "Quanto costa un impianto fotovoltaico a Bologna?",
      answer:
        "A Bologna un impianto residenziale chiavi in mano parte da circa 6.500 € per 3 kW e da 9.500 € per 6 kW, IVA agevolata al 10% e pratiche GSE incluse. Il prezzo finale dipende dal tipo di tetto, dalla presenza di accumulo e dall'inverter scelto. Ogni preventivo è personalizzato dopo il sopralluogo gratuito.",
    },
    {
      question: "Quanto produce un impianto fotovoltaico a Bologna?",
      answer:
        "In pianura bolognese la produzione media si attesta su 1.150-1.250 kWh per ogni kW installato all'anno. Un impianto da 6 kW ben esposto produce quindi tra i 6.900 e i 7.500 kWh annui. Nelle zone collinari (Sasso Marconi, Pianoro) la produzione può essere leggermente inferiore in inverno per l'orografia.",
    },
    {
      question: "Serve il tetto esposto a sud per installare a Bologna?",
      answer:
        "Non necessariamente. Le esposizioni est e ovest producono circa l'85-90% di un tetto ideale a sud, rendendo l'investimento comunque conveniente. Solo le esposizioni piene nord sono sconsigliate. In ogni sopralluogo verifichiamo esposizione, inclinazione e presenza di ombreggiamenti.",
    },
    {
      question: "Servono permessi comunali per installare a Bologna?",
      answer:
        "Nella maggior parte dei casi basta una comunicazione di attività edilizia libera. In centro storico, in zone soggette a vincolo paesaggistico o su edifici tutelati serve invece l'autorizzazione paesaggistica o parere della Soprintendenza. Ci occupiamo noi di tutta la parte burocratica.",
    },
    {
      question: "Quanto tempo richiede l'installazione a Bologna?",
      answer:
        "L'installazione fisica dura 1-3 giorni lavorativi per un impianto residenziale. Dalla firma del contratto alla messa in esercizio con GSE passano mediamente 45-60 giorni, tempi burocratici e-distribuzione compresi.",
    },
    {
      question: "Posso detrarre l'impianto fotovoltaico a Bologna?",
      answer:
        "Sì. Le detrazioni fiscali del 50% in 10 anni si applicano a tutta la provincia di Bologna per gli impianti installati su prima casa e seconda casa. Per approfondimenti consulta la pagina dedicata alle detrazioni per privati a Bologna.",
    },
    {
      question: "Serve manutenzione all'impianto fotovoltaico?",
      answer:
        "La manutenzione è minima: un controllo annuo e una pulizia dei pannelli ogni 2-3 anni (nella pianura padana la sporcizia si accumula più che in zone montane). Includiamo assistenza tecnica per 10 anni con monitoraggio remoto della produzione.",
    },
    {
      question: "Conviene aggiungere l'accumulo a Bologna?",
      answer:
        "Conviene se i consumi si concentrano di sera o durante il weekend. Con un accumulo da 5-10 kWh l'autoconsumo passa dal 30-40% al 70-80%, riducendo drasticamente il tempo di ritorno dell'investimento. Nel sopralluogo analizziamo le tue bollette per capire se ha senso.",
    },
  ],
  correlati: [
    { title: "Detrazioni Privati Bologna", description: "Come ottenere il 50% di detrazione fiscale a Bologna", href: "/agevolazioni/detrazioni-privati-bologna" },
    { title: "Calcola il tuo risparmio", description: "Simulatore online: risparmio annuo e tempo di ritorno", href: "/calcola-rendimento" },
    { title: "Lavori realizzati", description: "Impianti installati a Bologna e in Emilia-Romagna", href: "/lavori-realizzati" },
    { title: "Fotovoltaico per aziende", description: "Soluzioni per capannoni e attività commerciali", href: "/fotovoltaico-aziende" },
  ],
  agevolazioniPath: "/agevolazioni/detrazioni-privati-bologna",
};

export const modenaData: CityPageData = {
  city: "Modena",
  slug: "fotovoltaico-modena",
  provinciaSigla: "MO",
  title: "Fotovoltaico Modena | Installazione Chiavi in Mano PRM",
  description:
    "Impianti fotovoltaici a Modena: progetto, installazione e pratiche GSE. Consulenza tecnica con ingegnere, sopralluogo gratuito in tutta la provincia.",
  keywords: "fotovoltaico Modena, impianti fotovoltaici Modena, pannelli solari Modena, installatore Modena",
  h1: "Impianti fotovoltaici a Modena",
  heroSubtitle:
    "Progettazione ingegneristica e installazione chiavi in mano per case indipendenti, aziende agricole e capannoni della provincia di Modena.",
  heroImage: heroDefault,
  irraggiamento: "1.400 kWh/m²",
  produzioneKwhAnnoPer1kw: 1220,
  areeServite: [
    "Modena centro", "Formigine", "Sassuolo", "Carpi", "Castelfranco Emilia",
    "Vignola", "Maranello", "Fiorano Modenese", "Mirandola",
  ],
  intro:
    "Modena e la sua provincia hanno un irraggiamento leggermente superiore a quello di Bologna (1.400 kWh/m² contro 1.380), il che si traduce in una produzione media di 1.220 kWh per ogni kW installato all'anno. La struttura economica del territorio, fatta di piccole e medie imprese manifatturiere, aziende agricole e ville monofamiliari in pianura, rende il fotovoltaico particolarmente vantaggioso: i consumi elettrici sono spesso concentrati nelle ore diurne (attività produttive, climatizzazione estiva), quando l'impianto produce di più.",
  contestoLocale:
    "Nella pianura modenese prevalgono edifici a bassa densità con tetti a falda ampi, condizioni ideali per impianti da 6-20 kW. Nella fascia pedemontana (Sassuolo, Formigine, Maranello, Vignola) le tipologie si diversificano: bifamiliari degli anni '80, ville moderne in classe energetica alta, cascine ristrutturate. Per le aziende del distretto ceramico e meccanico progettiamo impianti industriali con potenza da 30 a 200+ kW, spesso abbinati ad accumulo o ricariche per auto elettriche aziendali.",
  perchePrm:
    "Da PRM raggiungiamo Modena in 40 minuti dalla sede di San Lazzaro. Serviamo tutta la provincia, dall'area urbana al distretto ceramico, fino alla Bassa. L'Ing. Navone segue personalmente ogni progetto: sopralluogo, dimensionamento, scelta dei componenti e collaudo. Nessun subappalto commerciale, solo lavoro tecnico diretto.",
  faqs: [
    {
      question: "Quanto costa un impianto fotovoltaico a Modena?",
      answer:
        "A Modena un impianto residenziale da 3 kW parte da 6.500 €, un 6 kW da 9.500 €, IVA al 10% e pratiche GSE incluse. Per impianti aziendali fino a 200 kW il costo unitario scende, mediamente tra 900 e 1.100 €/kW installato.",
    },
    {
      question: "Quanto produce un impianto fotovoltaico a Modena?",
      answer:
        "La produzione media in pianura modenese è di 1.200-1.250 kWh per kW installato all'anno. Un impianto residenziale da 6 kW produce quindi circa 7.200-7.500 kWh l'anno, sufficienti a coprire i consumi di una famiglia di 4 persone con auto elettrica in ricarica lenta.",
    },
    {
      question: "Il distretto ceramico ha vincoli particolari per il fotovoltaico?",
      answer:
        "No, la zona di Sassuolo, Fiorano e Maranello non ha vincoli specifici per il fotovoltaico su capannoni industriali. Anzi, i tetti industriali ampi e ben esposti sono la condizione ideale per impianti di grande taglia. Verifichiamo sempre carichi strutturali e presenza di eventuali coperture in cemento-amianto (da bonificare prima).",
    },
    {
      question: "Un'azienda agricola modenese può installare fotovoltaico?",
      answer:
        "Sì, e conviene molto. Le aziende agricole possono accedere alle detrazioni imprese, all'ammortamento accelerato e a bandi PSR regionali. Nel modenese abbiamo installato impianti su capannoni agricoli tra 20 e 100 kW con tempi di ritorno di 5-7 anni.",
    },
    {
      question: "Serve autorizzazione paesaggistica a Modena?",
      answer:
        "Solo per immobili in zona vincolata (centro storico, aree tutelate della fascia pedemontana). Nella maggior parte del territorio modenese basta la comunicazione di attività edilizia libera. Gestiamo noi tutta la parte burocratica.",
    },
    {
      question: "Posso installare fotovoltaico su una casa in campagna nella Bassa modenese?",
      answer:
        "Sì. La Bassa modenese (Mirandola, Carpi, San Felice) offre condizioni ideali: tetti ampi, esposizioni pulite, poco ombreggiamento. Le cascine e le case coloniche ristrutturate sono tra i nostri interventi più frequenti.",
    },
    {
      question: "Quanto dura un impianto fotovoltaico?",
      answer:
        "I pannelli attuali di gamma media/alta hanno garanzia di produzione lineare a 25-30 anni. Gli inverter durano mediamente 12-15 anni e vanno sostituiti una volta nella vita dell'impianto. La struttura di supporto in alluminio dura oltre 30 anni.",
    },
    {
      question: "Che tempi ci sono per l'attivazione con GSE?",
      answer:
        "Dopo la messa in servizio dell'impianto, i tempi per la pratica GSE e l'attivazione dello Scambio sul Posto sono di circa 30-45 giorni. Ci occupiamo noi di tutta la pratica.",
    },
  ],
  correlati: [
    { title: "Detrazioni Privati Modena", description: "50% di detrazione fiscale in provincia di Modena", href: "/agevolazioni/detrazioni-privati-modena" },
    { title: "Agevolazioni Aziende Modena", description: "Incentivi per capannoni e imprese modenesi", href: "/agevolazioni/agevolazioni-aziende-modena" },
    { title: "Calcolo ROI", description: "Simula il ritorno del tuo investimento", href: "/calcola-rendimento" },
    { title: "Fotovoltaico Aziende", description: "Impianti industriali su misura", href: "/fotovoltaico-aziende" },
  ],
  agevolazioniPath: "/agevolazioni/detrazioni-privati-modena",
};

export const ferraraData: CityPageData = {
  city: "Ferrara",
  slug: "fotovoltaico-ferrara",
  provinciaSigla: "FE",
  title: "Fotovoltaico Ferrara | Impianti Solari PRM Chiavi in Mano",
  description:
    "Impianti fotovoltaici a Ferrara e provincia: progettazione, installazione e GSE inclusi. Sopralluogo gratuito con l'ingegnere responsabile del progetto.",
  keywords: "fotovoltaico Ferrara, impianti fotovoltaici Ferrara, pannelli solari Ferrara, installatore Ferrara",
  h1: "Impianti fotovoltaici a Ferrara",
  heroSubtitle:
    "Installiamo impianti fotovoltaici residenziali e industriali a Ferrara e in tutta la provincia. Progetto firmato dall'ingegnere, nessun call center.",
  heroImage: heroDefault,
  irraggiamento: "1.360 kWh/m²",
  produzioneKwhAnnoPer1kw: 1180,
  areeServite: [
    "Ferrara centro", "Cento", "Argenta", "Comacchio", "Copparo",
    "Portomaggiore", "Bondeno", "Codigoro", "Poggio Renatico",
  ],
  intro:
    "Ferrara e la sua pianura offrono condizioni ottime per il fotovoltaico: cielo mediamente terso, poca nebbia rispetto alla pianura padana centrale nei mesi estivi, e un patrimonio edilizio composto da case singole, cascine e piccoli capannoni con tetti ampi e ben esposti. Un impianto residenziale da 6 kW nel ferrarese produce circa 7.100 kWh l'anno, con un risparmio in bolletta stimato tra 1.400 e 1.900 € annui a seconda del profilo di consumo e dell'eventuale accumulo.",
  contestoLocale:
    "Il territorio ferrarese è quasi interamente pianeggiante: questo semplifica il calcolo produttivo perché non ci sono ombre da rilievi. La tipologia edilizia dominante è la casa singola su lotto ampio, spesso con tetto a quattro falde, e la cascina ristrutturata. Nel centro storico di Ferrara, tutelato dall'UNESCO, valgono vincoli paesaggistici più stringenti che valutiamo caso per caso durante il sopralluogo. Nell'area di Cento, con la sua vocazione manifatturiera, lavoriamo spesso su capannoni industriali medio-piccoli.",
  perchePrm:
    "Serviamo la provincia di Ferrara con la stessa cura che riserviamo al territorio bolognese: sopralluogo tecnico in 48-72 ore, progetto firmato dall'Ing. Navone, installazione da parte del nostro team fisso e assistenza post-vendita diretta. Nessuna filiera commerciale: chi ti risponde al telefono è chi progetta il tuo impianto.",
  faqs: [
    {
      question: "Quanto costa un impianto fotovoltaico a Ferrara?",
      answer:
        "Il costo parte da circa 6.500 € per un 3 kW e 9.500 € per un 6 kW residenziale, IVA agevolata al 10% e pratiche GSE incluse. Per impianti aziendali il costo unitario scende in base alla taglia.",
    },
    {
      question: "Quanto produce un impianto fotovoltaico a Ferrara?",
      answer:
        "Nel ferrarese la produzione media è di 1.150-1.200 kWh per kW installato all'anno. Un impianto da 6 kW produce quindi 6.900-7.200 kWh annui. La pianura offre poche ombre e cieli tersi che favoriscono la producibilità estiva.",
    },
    {
      question: "Ci sono vincoli in centro storico a Ferrara?",
      answer:
        "Sì. Il centro storico di Ferrara è patrimonio UNESCO: richiede autorizzazione paesaggistica e in alcuni casi parere della Soprintendenza. Verifichiamo caso per caso la fattibilità, spesso con pannelli integrati o soluzioni non visibili dalla pubblica via.",
    },
    {
      question: "La nebbia della pianura riduce la produzione?",
      answer:
        "Marginalmente. La nebbia influisce soprattutto nei mesi invernali (novembre-gennaio) quando la produzione fotovoltaica è comunque bassa. Su base annua l'impatto sulla produzione totale è del 3-5%, già considerato nelle nostre simulazioni.",
    },
    {
      question: "Posso installare un impianto su una cascina in campagna?",
      answer:
        "Sì, e spesso è la condizione migliore. Cascine e case coloniche ferraresi hanno tetti ampi, ben esposti e senza ombreggiamenti. Verifichiamo la struttura portante (specie su edifici storici) e proponiamo la soluzione migliore.",
    },
    {
      question: "Serve manutenzione al fotovoltaico?",
      answer:
        "Poca: un controllo annuo e pulizia dei pannelli ogni 2-3 anni. Includiamo il monitoraggio remoto della produzione con notifica in caso di anomalie.",
    },
    {
      question: "Che detrazioni fiscali posso ottenere a Ferrara?",
      answer:
        "Le detrazioni al 50% in 10 anni valgono in tutta la provincia di Ferrara per privati che installano su prima o seconda casa. Approfondisci sulla pagina detrazioni privati Ferrara.",
    },
    {
      question: "Che tempi ci sono dall'ordine all'accensione?",
      answer:
        "Circa 45-60 giorni: 1-3 giorni per l'installazione fisica, il resto per pratiche e-distribuzione e attivazione GSE. Ci occupiamo noi di tutta la burocrazia.",
    },
  ],
  correlati: [
    { title: "Detrazioni Privati Ferrara", description: "Detrazione 50% per privati a Ferrara", href: "/agevolazioni/detrazioni-privati-ferrara" },
    { title: "Agevolazioni Aziende Ferrara", description: "Incentivi per imprese ferraresi", href: "/agevolazioni/agevolazioni-aziende-ferrara" },
    { title: "Calcola risparmio", description: "Simulatore online di risparmio annuo", href: "/calcola-rendimento" },
    { title: "Fotovoltaico Privati", description: "Guida agli impianti residenziali", href: "/fotovoltaico-privati" },
  ],
  agevolazioniPath: "/agevolazioni/detrazioni-privati-ferrara",
};

export const ravennaData: CityPageData = {
  city: "Ravenna",
  slug: "fotovoltaico-ravenna",
  provinciaSigla: "RA",
  title: "Fotovoltaico Ravenna | Impianti PRM Chiavi in Mano",
  description:
    "Fotovoltaico a Ravenna e provincia: progetto, installazione certificata e pratiche GSE. Consulenza diretta con l'ingegnere, sopralluogo gratuito.",
  keywords: "fotovoltaico Ravenna, impianti fotovoltaici Ravenna, pannelli solari Ravenna, installatore Ravenna",
  h1: "Impianti fotovoltaici a Ravenna",
  heroSubtitle:
    "Impianti solari per abitazioni, seconde case sulla riviera e attività commerciali della provincia di Ravenna. Ingegnere responsabile, non un call center.",
  heroImage: heroDefault,
  irraggiamento: "1.410 kWh/m²",
  produzioneKwhAnnoPer1kw: 1230,
  areeServite: [
    "Ravenna centro", "Faenza", "Lugo", "Cervia", "Milano Marittima",
    "Russi", "Bagnacavallo", "Alfonsine", "Cotignola",
  ],
  intro:
    "Ravenna gode di uno degli irraggiamenti più alti dell'Emilia-Romagna (1.410 kWh/m²), grazie alla vicinanza alla costa e a un clima più asciutto rispetto all'interno. Questo significa una produzione media di 1.230 kWh per ogni kW installato all'anno, un valore paragonabile a quello di molte province del Centro Italia. Sulla riviera (Cervia, Milano Marittima) il fotovoltaico è ideale anche per seconde case: gli impianti producono d'estate proprio quando le abitazioni sono più occupate, con climatizzazione attiva.",
  contestoLocale:
    "Il territorio ravennate è vario: pianura interna con case singole e capannoni agricoli (Lugo, Bagnacavallo), area urbana ravennate con condomini e villette, e la fascia costiera con residenze estive e strutture ricettive. Ogni contesto richiede un progetto dedicato: per le strutture turistiche di Cervia e Milano Marittima proponiamo spesso impianti con accumulo che coprono i picchi di consumo estivi (aria condizionata, ristorazione). Per le case coloniche ravennati sfruttiamo i tetti ampi tipici della zona.",
  perchePrm:
    "Copriamo la provincia di Ravenna dalla nostra sede di San Lazzaro con sopralluoghi programmati settimanalmente. L'Ing. Riccardo Navone segue direttamente ogni preventivo e ogni collaudo. La nostra scelta di lavorare con un team fisso e senza subappalti significa qualità costante e responsabilità chiara: chi installa risponde di quello che ha fatto.",
  faqs: [
    {
      question: "Quanto costa un impianto fotovoltaico a Ravenna?",
      answer:
        "A Ravenna un impianto residenziale chiavi in mano parte da 6.500 € per 3 kW e 9.500 € per 6 kW, con IVA agevolata e pratiche GSE. Per strutture ricettive sulla riviera il costo unitario varia in base a taglia e presenza di accumulo.",
    },
    {
      question: "Quanto produce un impianto a Ravenna?",
      answer:
        "La produzione media a Ravenna è tra le più alte della regione: 1.200-1.280 kWh per kW installato all'anno. Un 6 kW produce quindi 7.200-7.700 kWh annui. La zona costiera beneficia di irraggiamento aggiuntivo grazie ai cieli più tersi.",
    },
    {
      question: "Conviene installare fotovoltaico su una seconda casa a Cervia o Milano Marittima?",
      answer:
        "Sì, soprattutto se la casa viene affittata d'estate. Il fotovoltaico produce di più proprio quando la casa è più utilizzata (giugno-settembre) e con Scambio sul Posto l'energia in eccesso genera credito in bolletta. Con l'accumulo si copre anche il fabbisogno serale.",
    },
    {
      question: "Che vincoli ci sono in centro storico a Ravenna?",
      answer:
        "Il centro storico di Ravenna, con i suoi monumenti bizantini UNESCO, ha vincoli paesaggistici stringenti. In generale si privilegiano soluzioni non visibili dalla pubblica via o pannelli integrati. Valutiamo caso per caso durante il sopralluogo.",
    },
    {
      question: "L'aria salmastra della costa danneggia i pannelli?",
      answer:
        "I pannelli di qualità (che utilizziamo standard) hanno telai in alluminio anodizzato e connessioni certificate per uso costiero. Consigliamo controlli e pulizia con frequenza leggermente maggiore rispetto all'entroterra (ogni 18-24 mesi anziché ogni 2-3 anni).",
    },
    {
      question: "Serve autorizzazione comunale a Faenza o Lugo?",
      answer:
        "Nella maggior parte dei casi basta una comunicazione di attività libera. In centri storici o su edifici tutelati serve autorizzazione paesaggistica. Ce ne occupiamo noi.",
    },
    {
      question: "Quali detrazioni posso ottenere?",
      answer:
        "Le detrazioni al 50% in 10 anni valgono in tutta la provincia di Ravenna per privati. Consulta la pagina dedicata alle detrazioni per privati Ravenna.",
    },
    {
      question: "Un'attività ricettiva può accedere a incentivi specifici?",
      answer:
        "Sì. Le strutture ricettive rientrano nelle detrazioni per imprese, con la possibilità di ammortamento accelerato. In alcuni casi sono attivi bandi regionali dedicati al turismo sostenibile. Approfondiamo caso per caso.",
    },
  ],
  correlati: [
    { title: "Detrazioni Privati Ravenna", description: "50% di detrazione per privati a Ravenna", href: "/agevolazioni/detrazioni-privati-ravenna" },
    { title: "Agevolazioni Aziende Ravenna", description: "Incentivi per strutture ricettive e imprese", href: "/agevolazioni/agevolazioni-aziende-ravenna" },
    { title: "Calcola rendimento", description: "Simulatore risparmio online", href: "/calcola-rendimento" },
    { title: "Lavori realizzati", description: "Impianti installati in Emilia-Romagna", href: "/lavori-realizzati" },
  ],
  agevolazioniPath: "/agevolazioni/detrazioni-privati-ravenna",
};
