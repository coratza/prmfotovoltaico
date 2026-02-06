import AgevolazionePageTemplate from "@/components/AgevolazionePageTemplate";

const AgevolazioniAziendeModena = () => (
  <AgevolazionePageTemplate
    title="Agevolazioni Fotovoltaico Aziende Modena - PRM Fotovoltaico"
    metaDescription="Agevolazioni fiscali fino al 180% per impianti fotovoltaici aziendali a Modena e provincia. Credito d'imposta e ammortamento per la tua impresa."
    heroTitle="Agevolazioni Fotovoltaico Aziende a Modena"
    heroSubtitle="Hai un'azienda a Modena o in provincia? Scopri le agevolazioni fiscali per installare un impianto fotovoltaico e ridurre i costi energetici."
    badge="-180%"
    province="Modena"
    sections={[
      {
        title: "Agevolazioni per imprese modenesi",
        content: [
          "Il distretto produttivo di Modena è tra i più energivori dell'Emilia-Romagna. Il fotovoltaico rappresenta un'opportunità concreta per ridurre i costi operativi.",
          "Le agevolazioni fiscali disponibili — credito d'imposta Transizione 5.0 e ammortamento — possono coprire fino al 180% del valore dell'investimento.",
          "PRM Fotovoltaico serve anche le aziende della provincia di Modena con sopralluoghi diretti e progetti su misura.",
        ],
      },
      {
        title: "Il distretto ceramico e le PMI modenesi",
        content: [
          "Dal distretto ceramico di Sassuolo alle PMI di Carpi e Mirandola, le aziende modenesi hanno consumi energetici significativi che il fotovoltaico può abbattere.",
          "Progettiamo impianti industriali dimensionati sui profili di consumo reali, ottimizzando autoconsumo e ritorno dell'investimento.",
        ],
      },
      {
        title: "Zone servite nella provincia di Modena",
        content: [
          "Operiamo in tutta la provincia: Carpi, Sassuolo, Formigine, Castelfranco Emilia, Vignola, Mirandola, Fiorano, Maranello, Soliera, Pavullo e tutte le altre zone industriali.",
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
      { label: "Agevolazioni Ferrara", href: "/agevolazioni/agevolazioni-aziende-ferrara" },
      { label: "Agevolazioni Ravenna", href: "/agevolazioni/agevolazioni-aziende-ravenna" },
      { label: "Detrazioni privati Modena", href: "/agevolazioni/detrazioni-privati-modena" },
    ]}
  />
);

export default AgevolazioniAziendeModena;
