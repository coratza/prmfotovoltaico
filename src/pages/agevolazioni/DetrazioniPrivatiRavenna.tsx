import AgevolazionePageTemplate from "@/components/AgevolazionePageTemplate";

const DetrazioniPrivatiRavenna = () => (
  <AgevolazionePageTemplate
    title="Detrazione Fotovoltaico Privati Ravenna | Ecobonus 50% Casa | PRM"
    metaDescription="Detrazione fiscale 50% per impianti fotovoltaici su abitazioni a Ravenna e provincia. Installatore locale PRM Fotovoltaico. Sopralluogo gratuito, preventivo chiavi in mano."
    keywords="detrazione fotovoltaico Ravenna, ecobonus fotovoltaico Ravenna, detrazione 50% fotovoltaico casa Ravenna, agevolazioni fotovoltaico privati Ravenna, bonus fotovoltaico Ravenna provincia, installatore fotovoltaico Ravenna, pannelli solari casa Ravenna"
    heroTitle="Detrazioni Fotovoltaico Privati a Ravenna"
    heroSubtitle="Possiedi una casa a Ravenna o in provincia? Scopri come usufruire della detrazione fiscale del 50% per il tuo impianto fotovoltaico."
    badge="-50%"
    province="Ravenna"
    canonicalPath="/agevolazioni/detrazioni-privati-ravenna"
    breadcrumbs={[
      { name: "Home", href: "/" },
      { name: "Agevolazioni", href: "/agevolazioni" },
      { name: "Detrazioni Privati", href: "/agevolazioni/detrazioni-privati" },
      { name: "Ravenna", href: "/agevolazioni/detrazioni-privati-ravenna" },
    ]}
    sections={[
      {
        title: "Detrazione del 50% per abitazioni a Ravenna",
        content: [
          "I proprietari di abitazioni a Ravenna e provincia possono accedere alla detrazione fiscale del 50% per l'installazione di impianti fotovoltaici residenziali.",
          "La detrazione si recupera in 10 anni tramite la dichiarazione dei redditi, rendendo l'investimento particolarmente accessibile.",
          "PRM Fotovoltaico serve anche la provincia di Ravenna con il suo approccio diretto e professionale.",
        ],
      },
      {
        title: "Fotovoltaico sulla costa romagnola",
        content: [
          "La provincia di Ravenna gode di un eccellente irraggiamento solare, che rende il fotovoltaico particolarmente produttivo in questa zona.",
          "Dalle abitazioni sulla costa alle case della pianura interna, ogni tetto può diventare una fonte di energia e risparmio.",
        ],
      },
      {
        title: "Zone servite nella provincia di Ravenna",
        content: [
          "Operiamo in tutta la provincia: Faenza, Lugo, Cervia, Russi, Bagnacavallo, Alfonsine, Castel Bolognese, Massa Lombarda e tutte le altre località.",
        ],
      },
    ]}
    requirements={[
      "Abitazione esistente a Ravenna o provincia",
      "Pagamento tramite bonifico parlante",
      "Comunicazione ENEA entro 90 giorni",
      "Conformità alle norme tecniche vigenti",
      "Tetto massimo di spesa: 96.000€ per unità immobiliare",
    ]}
    relatedLinks={[
      { label: "Detrazioni Bologna", href: "/agevolazioni/detrazioni-privati-bologna" },
      { label: "Detrazioni Modena", href: "/agevolazioni/detrazioni-privati-modena" },
      { label: "Detrazioni Ferrara", href: "/agevolazioni/detrazioni-privati-ferrara" },
      { label: "Agevolazioni aziende Ravenna", href: "/agevolazioni/agevolazioni-aziende-ravenna" },
    ]}
  />
);

export default DetrazioniPrivatiRavenna;
