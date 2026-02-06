import AgevolazionePageTemplate from "@/components/AgevolazionePageTemplate";

const AgevolazioniAziendeRavenna = () => (
  <AgevolazionePageTemplate
    title="Agevolazioni Fotovoltaico Aziende Ravenna - PRM Fotovoltaico"
    metaDescription="Agevolazioni fiscali fino al 180% per impianti fotovoltaici aziendali a Ravenna e provincia. Credito d'imposta per la tua impresa."
    heroTitle="Agevolazioni Fotovoltaico Aziende a Ravenna"
    heroSubtitle="Hai un'azienda a Ravenna o in provincia? Le agevolazioni fiscali rendono il fotovoltaico un investimento strategico per la tua impresa."
    badge="-180%"
    province="Ravenna"
    sections={[
      {
        title: "Agevolazioni per imprese ravennati",
        content: [
          "Le aziende della provincia di Ravenna possono accedere al credito d'imposta Transizione 5.0 per investimenti in impianti fotovoltaici.",
          "Combinando credito d'imposta e ammortamento, il beneficio fiscale complessivo può raggiungere il 180% del valore dell'investimento.",
          "PRM Fotovoltaico opera anche a Ravenna e provincia, garantendo lo stesso livello di servizio e professionalità.",
        ],
      },
      {
        title: "Porto industriale e attività commerciali",
        content: [
          "La zona industriale di Ravenna e il porto ospitano numerose attività con consumi energetici elevati, ideali per il fotovoltaico industriale.",
          "Anche le attività commerciali di Faenza, Lugo e Cervia possono beneficiare significativamente dell'autoproduzione di energia.",
        ],
      },
      {
        title: "Zone servite nella provincia di Ravenna",
        content: [
          "Operiamo in tutta la provincia: Faenza, Lugo, Cervia, Russi, Bagnacavallo, Alfonsine, Castel Bolognese, Massa Lombarda e tutte le zone produttive.",
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
      { label: "Agevolazioni Ferrara", href: "/agevolazioni/agevolazioni-aziende-ferrara" },
      { label: "Detrazioni privati Ravenna", href: "/agevolazioni/detrazioni-privati-ravenna" },
    ]}
  />
);

export default AgevolazioniAziendeRavenna;
