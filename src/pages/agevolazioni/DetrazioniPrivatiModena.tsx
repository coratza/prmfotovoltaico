import AgevolazionePageTemplate from "@/components/AgevolazionePageTemplate";

const DetrazioniPrivatiModena = () => (
  <AgevolazionePageTemplate
    title="Detrazione Fotovoltaico Privati Modena | Ecobonus 50% Casa | PRM"
    metaDescription="Detrazione fiscale 50% per impianti fotovoltaici su abitazioni a Modena e provincia. Installatore fotovoltaico PRM. Sopralluogo gratuito, preventivo chiavi in mano."
    keywords="detrazione fotovoltaico Modena, ecobonus fotovoltaico Modena, detrazione 50% fotovoltaico casa Modena, agevolazioni fotovoltaico privati Modena, bonus fotovoltaico Modena provincia, installatore fotovoltaico Modena, pannelli solari casa Modena"
    heroTitle="Detrazioni Fotovoltaico Privati a Modena"
    heroSubtitle="Possiedi una casa a Modena o in provincia? Puoi usufruire della detrazione fiscale del 50% per l'installazione del tuo impianto fotovoltaico."
    badge="-50%"
    province="Modena"
    canonicalPath="/agevolazioni/detrazioni-privati-modena"
    breadcrumbs={[
      { name: "Home", href: "/" },
      { name: "Agevolazioni", href: "/agevolazioni" },
      { name: "Detrazioni Privati", href: "/agevolazioni/detrazioni-privati" },
      { name: "Modena", href: "/agevolazioni/detrazioni-privati-modena" },
    ]}
    sections={[
      {
        title: "Detrazione del 50% per abitazioni a Modena",
        content: [
          "La detrazione fiscale del 50% è disponibile per tutti i proprietari di abitazioni a Modena e provincia che installano un impianto fotovoltaico.",
          "Il recupero avviene in 10 rate annuali nella dichiarazione dei redditi. Un investimento che si ripaga da solo grazie al risparmio in bolletta e alla detrazione.",
          "PRM Fotovoltaico serve anche la provincia di Modena con lo stesso approccio artigianale e diretto.",
        ],
      },
      {
        title: "Fotovoltaico a Modena: condizioni ideali",
        content: [
          "La provincia di Modena offre ottime condizioni di irraggiamento solare. Le abitazioni della zona, spesso con ampi tetti a falde, sono ideali per il fotovoltaico.",
          "Progettiamo ogni impianto partendo dai consumi reali della famiglia e dalle caratteristiche specifiche del tetto.",
        ],
      },
      {
        title: "Zone servite nella provincia di Modena",
        content: [
          "Operiamo in tutta la provincia di Modena: Carpi, Sassuolo, Formigine, Castelfranco Emilia, Vignola, Pavullo, Maranello, Fiorano Modenese, Soliera, Mirandola e tutte le altre località.",
        ],
      },
    ]}
    requirements={[
      "Abitazione esistente a Modena o provincia",
      "Pagamento tramite bonifico parlante",
      "Comunicazione ENEA entro 90 giorni",
      "Conformità alle norme tecniche vigenti",
      "Tetto massimo di spesa: 96.000€ per unità immobiliare",
    ]}
    relatedLinks={[
      { label: "Detrazioni Bologna", href: "/agevolazioni/detrazioni-privati-bologna" },
      { label: "Detrazioni Ferrara", href: "/agevolazioni/detrazioni-privati-ferrara" },
      { label: "Detrazioni Ravenna", href: "/agevolazioni/detrazioni-privati-ravenna" },
      { label: "Agevolazioni aziende Modena", href: "/agevolazioni/agevolazioni-aziende-modena" },
    ]}
  />
);

export default DetrazioniPrivatiModena;
