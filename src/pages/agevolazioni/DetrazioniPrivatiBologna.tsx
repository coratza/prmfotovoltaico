import AgevolazionePageTemplate from "@/components/AgevolazionePageTemplate";

const DetrazioniPrivatiBologna = () => (
  <AgevolazionePageTemplate
    title="Detrazione Fotovoltaico Privati Bologna | Ecobonus 50% Casa | PRM"
    metaDescription="Detrazione fiscale 50% per impianti fotovoltaici su abitazioni a Bologna e provincia. Installatore locale PRM Fotovoltaico. Sopralluogo gratuito, chiavi in mano."
    keywords="detrazione fotovoltaico Bologna, ecobonus fotovoltaico Bologna, detrazione 50% fotovoltaico casa Bologna, agevolazioni fotovoltaico privati Bologna, bonus fotovoltaico Bologna provincia, detrazione fiscale pannelli solari Bologna, installatore fotovoltaico San Lazzaro di Savena"
    heroTitle="Detrazioni Fotovoltaico Privati a Bologna"
    heroSubtitle="Sei proprietario di una casa a Bologna o in provincia? Puoi usufruire della detrazione fiscale del 50% per l'installazione di un impianto fotovoltaico sulla tua abitazione."
    badge="-50%"
    province="Bologna"
    canonicalPath="/agevolazioni/detrazioni-privati-bologna"
    breadcrumbs={[
      { name: "Home", href: "/" },
      { name: "Agevolazioni", href: "/agevolazioni" },
      { name: "Detrazioni Privati", href: "/agevolazioni/detrazioni-privati" },
      { name: "Bologna", href: "/agevolazioni/detrazioni-privati-bologna" },
    ]}
    sections={[
      {
        title: "Detrazione del 50% per abitazioni a Bologna",
        content: [
          "Se possiedi una casa indipendente, una villa o un'abitazione a Bologna e provincia, puoi installare un impianto fotovoltaico beneficiando della detrazione fiscale del 50%.",
          "La detrazione viene recuperata in 10 rate annuali tramite la dichiarazione dei redditi. Qualunque sia il costo del tuo impianto, ne recuperi la metà. Contattaci per scoprire quanto puoi risparmiare nel tuo caso specifico.",
          "PRM Fotovoltaico opera direttamente a Bologna e provincia con sede a San Lazzaro di Savena. Siamo installatori locali, non intermediari.",
        ],
      },
      {
        title: "Perché scegliere un installatore di Bologna",
        content: [
          "Conosciamo il territorio bolognese, le caratteristiche delle abitazioni e le condizioni di irraggiamento solare della zona.",
          "Effettuiamo sopralluoghi rapidi perché siamo in zona. Non devi aspettare settimane per un preventivo.",
          "L'assistenza post-vendita è immediata: siamo a pochi chilometri da te.",
        ],
      },
      {
        title: "Zone servite nella provincia di Bologna",
        content: [
          "Installiamo impianti fotovoltaici in tutta la provincia di Bologna: San Lazzaro di Savena, Casalecchio di Reno, Pianoro, Castel San Pietro Terme, Ozzano dell'Emilia, Imola, Medicina, Budrio, San Giovanni in Persiceto, Zola Predosa e tutte le altre località.",
        ],
      },
    ]}
    requirements={[
      "Abitazione esistente a Bologna o provincia",
      "Pagamento tramite bonifico parlante",
      "Comunicazione ENEA entro 90 giorni",
      "Conformità alle norme tecniche vigenti",
      "Tetto massimo di spesa: 96.000€ per unità immobiliare",
    ]}
    relatedLinks={[
      { label: "Detrazioni Modena", href: "/agevolazioni/detrazioni-privati-modena" },
      { label: "Detrazioni Ferrara", href: "/agevolazioni/detrazioni-privati-ferrara" },
      { label: "Detrazioni Ravenna", href: "/agevolazioni/detrazioni-privati-ravenna" },
      { label: "Agevolazioni aziende Bologna", href: "/agevolazioni/agevolazioni-aziende-bologna" },
    ]}
  />
);

export default DetrazioniPrivatiBologna;
