import AgevolazionePageTemplate from "@/components/AgevolazionePageTemplate";

const provinces = ["Bologna", "Modena", "Ferrara", "Ravenna"];

const AgevolazioniAziende = () => (
  <AgevolazionePageTemplate
    title="Agevolazioni Fotovoltaico Aziende Emilia-Romagna | Credito Imposta 180% | PRM"
    metaDescription="Credito d'imposta, ammortamento e Transizione 5.0: agevolazioni fiscali fino al 180% per impianti fotovoltaici aziendali in Emilia-Romagna. Guida completa PRM."
    keywords="agevolazioni fotovoltaico aziende, credito d'imposta fotovoltaico, Transizione 5.0 fotovoltaico, super ammortamento fotovoltaico industriale, agevolazioni fiscali PMI Emilia-Romagna, incentivi fotovoltaico impresa, credito imposta beni strumentali 5.0, contributi fotovoltaico aziendale, deduzione fiscale impianto fotovoltaico"
    heroTitle="Agevolazioni Fotovoltaico per Aziende"
    heroSubtitle="Sono disponibili agevolazioni fiscali fino al 180% del valore dell'investimento. Il beneficio dipende dalla tipologia di impresa e dal regime fiscale."
    badge="-180%"
    canonicalPath="/agevolazioni/agevolazioni-aziende"
    breadcrumbs={[
      { name: "Home", href: "/" },
      { name: "Agevolazioni", href: "/agevolazioni" },
      { name: "Agevolazioni Aziende", href: "/agevolazioni/agevolazioni-aziende" },
    ]}
    sections={[
      {
        title: "Piano Transizione 5.0",
        content: [
          "Il Piano Transizione 5.0 prevede un credito d'imposta fino al 45% per investimenti in beni strumentali legati alla transizione energetica, inclusi gli impianti fotovoltaici.",
          "Il credito è cumulabile con altre agevolazioni, portando il beneficio complessivo fino al 180% del valore dell'investimento in termini di deduzione fiscale.",
          "Le imprese di ogni dimensione possono accedere a questa misura, con modalità diverse a seconda della tipologia e della classe energetica raggiunta.",
        ],
      },
      {
        title: "Credito d'imposta e ammortamento",
        content: [
          "L'impianto fotovoltaico è un bene strumentale ammortizzabile. L'ammortamento consente di dedurre il costo dell'investimento dal reddito d'impresa.",
          "Combinando credito d'imposta, ammortamento accelerato e risparmio energetico, il ritorno sull'investimento per le aziende diventa particolarmente interessante.",
          "È fondamentale una consulenza specifica per determinare la combinazione ottimale di agevolazioni per la tua impresa.",
        ],
      },
      {
        title: "Risparmio energetico per le aziende",
        content: [
          "Le aziende con consumi energetici elevati sono quelle che beneficiano maggiormente del fotovoltaico. L'autoconsumo diretto riduce significativamente il costo dell'energia.",
          "Per capannoni industriali, uffici e attività commerciali, progettiamo impianti dimensionati sui consumi reali, massimizzando l'autoconsumo durante le ore lavorative.",
        ],
      },
    ]}
    requirements={[
      "L'impresa deve essere in regola con gli obblighi contributivi e fiscali",
      "L'investimento deve essere documentato e certificato",
      "È necessaria una perizia tecnica asseverata per importi superiori a 300.000€",
      "La comunicazione al GSE deve essere effettuata nei tempi previsti",
      "Il credito d'imposta è utilizzabile in compensazione tramite F24",
    ]}
    relatedLinks={provinces.map((p) => ({
      label: `Agevolazioni a ${p}`,
      href: `/agevolazioni/agevolazioni-aziende-${p.toLowerCase()}`,
    }))}
  />
);

export default AgevolazioniAziende;
