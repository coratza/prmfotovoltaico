import AgevolazionePageTemplate from "@/components/AgevolazionePageTemplate";

const AgevolazioniAziendeFerrara = () => (
  <AgevolazionePageTemplate
    title="Agevolazioni Fotovoltaico Aziende Ferrara - PRM Fotovoltaico"
    metaDescription="Agevolazioni fiscali fino al 180% per impianti fotovoltaici aziendali a Ferrara e provincia. Credito d'imposta per la tua impresa."
    heroTitle="Agevolazioni Fotovoltaico Aziende a Ferrara"
    heroSubtitle="La tua azienda è a Ferrara o in provincia? Scopri come le agevolazioni fiscali possono rendere il fotovoltaico un investimento a costo quasi zero."
    badge="-180%"
    province="Ferrara"
    sections={[
      {
        title: "Agevolazioni per aziende ferraresi",
        content: [
          "Le imprese della provincia di Ferrara possono beneficiare del credito d'imposta Transizione 5.0, combinato con l'ammortamento del bene strumentale.",
          "Il beneficio fiscale complessivo può arrivare fino al 180% del valore dell'investimento, rendendo il fotovoltaico una scelta economicamente molto vantaggiosa.",
          "PRM Fotovoltaico effettua sopralluoghi diretti anche nella provincia di Ferrara.",
        ],
      },
      {
        title: "Aziende agricole e PMI ferraresi",
        content: [
          "La provincia di Ferrara è caratterizzata da un forte settore agricolo e da numerose PMI. Entrambi possono trarre grande vantaggio dal fotovoltaico.",
          "Per le aziende agricole, le ampie coperture di stalle, fienili e magazzini rappresentano superfici ideali per impianti di grande potenza.",
        ],
      },
      {
        title: "Zone servite nella provincia di Ferrara",
        content: [
          "Installiamo in tutta la provincia: Cento, Comacchio, Copparo, Argenta, Portomaggiore, Codigoro, Bondeno, Mesola e tutte le zone produttive.",
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
      { label: "Agevolazioni Bologna", href: "/agevolazioni/agevolazioni-aziende-bologna" },
      { label: "Agevolazioni Modena", href: "/agevolazioni/agevolazioni-aziende-modena" },
      { label: "Agevolazioni Ravenna", href: "/agevolazioni/agevolazioni-aziende-ravenna" },
      { label: "Detrazioni privati Ferrara", href: "/agevolazioni/detrazioni-privati-ferrara" },
    ]}
  />
);

export default AgevolazioniAziendeFerrara;
