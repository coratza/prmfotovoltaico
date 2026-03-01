import AgevolazionePageTemplate from "@/components/AgevolazionePageTemplate";

const DetrazioniPrivatiFerrara = () => (
  <AgevolazionePageTemplate
    title="Detrazioni Fotovoltaico Privati Ferrara - PRM Fotovoltaico"
    metaDescription="Detrazione fiscale fino al 50% per impianti fotovoltaici su abitazioni a Ferrara e provincia. Installatore locale PRM Fotovoltaico."
    heroTitle="Detrazioni Fotovoltaico Privati a Ferrara"
    heroSubtitle="Hai una casa a Ferrara o in provincia? Puoi beneficiare della detrazione fiscale del 50% per installare un impianto fotovoltaico sulla tua abitazione."
    badge="-50%"
    province="Ferrara"
    canonicalPath="/agevolazioni/detrazioni-privati-ferrara"
    breadcrumbs={[
      { name: "Home", href: "/" },
      { name: "Agevolazioni", href: "/agevolazioni" },
      { name: "Detrazioni Privati", href: "/agevolazioni/detrazioni-privati" },
      { name: "Ferrara", href: "/agevolazioni/detrazioni-privati-ferrara" },
    ]}
    sections={[
      {
        title: "Detrazione del 50% per abitazioni a Ferrara",
        content: [
          "Anche i proprietari di abitazioni a Ferrara e provincia possono accedere alla detrazione fiscale del 50% per l'installazione di impianti fotovoltaici.",
          "Il recupero avviene in 10 rate annuali. Combinato con il risparmio in bolletta, il fotovoltaico diventa un investimento con ritorno garantito.",
          "PRM Fotovoltaico opera anche nella provincia di Ferrara con sopralluoghi diretti e assistenza locale.",
        ],
      },
      {
        title: "Il fotovoltaico nella pianura ferrarese",
        content: [
          "La provincia di Ferrara, con la sua conformazione pianeggiante e l'elevato irraggiamento solare, è tra le zone più favorevoli d'Italia per il fotovoltaico.",
          "Le abitazioni rurali e le case indipendenti della zona hanno spesso tetti ampi e ben esposti, ideali per impianti di buona potenza.",
        ],
      },
      {
        title: "Zone servite nella provincia di Ferrara",
        content: [
          "Installiamo impianti fotovoltaici in tutta la provincia: Cento, Comacchio, Copparo, Argenta, Portomaggiore, Codigoro, Bondeno, Mesola e tutte le altre località.",
        ],
      },
    ]}
    requirements={[
      "Abitazione esistente a Ferrara o provincia",
      "Pagamento tramite bonifico parlante",
      "Comunicazione ENEA entro 90 giorni",
      "Conformità alle norme tecniche vigenti",
      "Tetto massimo di spesa: 96.000€ per unità immobiliare",
    ]}
    relatedLinks={[
      { label: "Detrazioni Bologna", href: "/agevolazioni/detrazioni-privati-bologna" },
      { label: "Detrazioni Modena", href: "/agevolazioni/detrazioni-privati-modena" },
      { label: "Detrazioni Ravenna", href: "/agevolazioni/detrazioni-privati-ravenna" },
      { label: "Agevolazioni aziende Ferrara", href: "/agevolazioni/agevolazioni-aziende-ferrara" },
    ]}
  />
);

export default DetrazioniPrivatiFerrara;
