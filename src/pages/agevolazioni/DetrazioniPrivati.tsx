import AgevolazionePageTemplate from "@/components/AgevolazionePageTemplate";

const provinces = ["Bologna", "Modena", "Ferrara", "Ravenna"];

const DetrazioniPrivati = () => (
  <AgevolazionePageTemplate
    title="Detrazioni Fotovoltaico Privati Emilia-Romagna | Ecobonus 50% | PRM"
    metaDescription="Detrazione fiscale 50% per impianti fotovoltaici su abitazioni in Emilia-Romagna. Requisiti, come richiederla, quanto risparmi. Guida completa PRM Fotovoltaico."
    keywords="detrazione fotovoltaico 50%, detrazione fiscale fotovoltaico privati, ecobonus fotovoltaico casa, agevolazioni fotovoltaico residenziale Emilia-Romagna, detrazione impianto fotovoltaico abitazione, bonus fotovoltaico 2026, come funziona detrazione fotovoltaico, comunicazione ENEA fotovoltaico, detrazione accumulo batterie"
    heroTitle="Detrazioni Fotovoltaico per Privati"
    heroSubtitle="È prevista una detrazione fiscale fino al 50% per l'installazione di impianti fotovoltaici su abitazioni. La detrazione viene recuperata nel tempo tramite la dichiarazione dei redditi."
    badge="-50%"
    canonicalPath="/agevolazioni/detrazioni-privati"
    breadcrumbs={[
      { name: "Home", href: "/" },
      { name: "Agevolazioni", href: "/agevolazioni" },
      { name: "Detrazioni Privati", href: "/agevolazioni/detrazioni-privati" },
    ]}
    sections={[
      {
        title: "Come funziona la detrazione del 50%",
        content: [
          "La detrazione fiscale per il fotovoltaico consente di recuperare il 50% del costo dell'impianto attraverso la dichiarazione dei redditi, suddivisa in 10 rate annuali di pari importo.",
          "Questo significa che, qualunque sia il costo del tuo impianto, ne recuperi la metà. Il risparmio effettivo dipende dalla dimensione dell'impianto e dalle caratteristiche della tua abitazione.",
          "La detrazione si applica alle spese sostenute per l'acquisto e l'installazione di impianti fotovoltaici su edifici residenziali esistenti. Contattaci per un preventivo personalizzato e scopri quanto puoi risparmiare nel tuo caso specifico.",
        ],
      },
      {
        title: "Quanto puoi risparmiare concretamente",
        content: [
          "Il costo di un impianto fotovoltaico residenziale dipende dalla potenza, dalla tipologia di pannelli e inverter, e dalla complessità dell'installazione. Con la detrazione del 50%, il costo effettivo si dimezza sempre.",
          "A questo si aggiunge il risparmio in bolletta che, a seconda dei consumi e dell'autoconsumo, può essere molto significativo già dal primo anno.",
          "Ogni situazione è diversa: chiamaci o richiedi un sopralluogo gratuito per ricevere un preventivo dettagliato e scoprire il tempo di ritorno dell'investimento per la tua casa.",
        ],
      },
      {
        title: "Sistemi di accumulo e batterie",
        content: [
          "La detrazione del 50% si applica anche ai sistemi di accumulo (batterie), sia installati contestualmente all'impianto sia aggiunti successivamente.",
          "Le batterie permettono di aumentare l'autoconsumo e ridurre ulteriormente la dipendenza dalla rete elettrica.",
        ],
      },
    ]}
    requirements={[
      "L'impianto deve essere installato su un edificio residenziale esistente",
      "Il pagamento deve avvenire tramite bonifico parlante",
      "È necessaria la comunicazione all'ENEA entro 90 giorni dalla fine dei lavori",
      "L'impianto deve rispettare le norme tecniche vigenti",
      "Il tetto massimo di spesa detraibile è di 96.000€ per unità immobiliare",
    ]}
    relatedLinks={provinces.map((p) => ({
      label: `Detrazioni a ${p}`,
      href: `/agevolazioni/detrazioni-privati-${p.toLowerCase()}`,
    }))}
  />
);

export default DetrazioniPrivati;
