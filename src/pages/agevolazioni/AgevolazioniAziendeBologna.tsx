import AgevolazionePageTemplate from "@/components/AgevolazionePageTemplate";

const AgevolazioniAziendeBologna = () => (
  <AgevolazionePageTemplate
    title="Agevolazioni Fotovoltaico Aziende Bologna - PRM Fotovoltaico"
    metaDescription="Agevolazioni fiscali fino al 180% per impianti fotovoltaici aziendali a Bologna e provincia. Credito d'imposta e ammortamento per la tua impresa."
    heroTitle="Agevolazioni Fotovoltaico Aziende a Bologna"
    heroSubtitle="La tua azienda è a Bologna o in provincia? Scopri le agevolazioni fiscali disponibili per ridurre i costi energetici con il fotovoltaico."
    badge="-180%"
    province="Bologna"
    sections={[
      {
        title: "Agevolazioni per aziende bolognesi",
        content: [
          "Le imprese di Bologna e provincia possono accedere a un pacchetto di agevolazioni fiscali che rende l'investimento nel fotovoltaico particolarmente conveniente.",
          "Il Piano Transizione 5.0 prevede un credito d'imposta fino al 45%, cumulabile con l'ammortamento del bene strumentale, per un beneficio complessivo fino al 180%.",
          "PRM Fotovoltaico ha sede a San Lazzaro di Savena e conosce le realtà produttive del territorio bolognese.",
        ],
      },
      {
        title: "Capannoni e attività produttive a Bologna",
        content: [
          "La zona industriale di Bologna e i comuni limitrofi ospitano migliaia di capannoni e attività produttive con ampie coperture ideali per il fotovoltaico.",
          "Progettiamo impianti dimensionati sui consumi reali dell'azienda, ottimizzando l'autoconsumo durante le ore lavorative.",
          "Il sopralluogo tecnico è gratuito e senza impegno. Valutiamo il potenziale del tuo tetto e i benefici economici concreti.",
        ],
      },
      {
        title: "Zone industriali servite",
        content: [
          "Operiamo in tutte le zone industriali della provincia: Zola Predosa, Casalecchio, Castel Maggiore, Granarolo, Calderara, Anzola dell'Emilia, Castel San Pietro Terme, Imola e tutte le altre aree produttive.",
        ],
      },
    ]}
    requirements={[
      "Impresa regolarmente iscritta e in regola con gli obblighi fiscali",
      "Investimento documentato con fatture e pagamenti tracciabili",
      "Perizia tecnica asseverata per importi superiori a 300.000€",
      "Comunicazione al GSE nei tempi previsti",
      "Credito d'imposta utilizzabile in compensazione tramite F24",
    ]}
    relatedLinks={[
      { label: "Agevolazioni Modena", href: "/agevolazioni/agevolazioni-aziende-modena" },
      { label: "Agevolazioni Ferrara", href: "/agevolazioni/agevolazioni-aziende-ferrara" },
      { label: "Agevolazioni Ravenna", href: "/agevolazioni/agevolazioni-aziende-ravenna" },
      { label: "Detrazioni privati Bologna", href: "/agevolazioni/detrazioni-privati-bologna" },
    ]}
  />
);

export default AgevolazioniAziendeBologna;
