const steps = [
  {
    number: "1",
    title: "Primo contatto:",
    description: "Raccogliamo le informazioni essenziali.",
  },
  {
    number: "2",
    title: "Sopralluogo tecnico:",
    description: "Analizziamo tetto, struttura e consumi.",
  },
  {
    number: "3",
    title: "Progetto su misura:",
    description: "Dimensioniamo l'impianto in modo coerente.",
  },
  {
    number: "4",
    title: "Installazione e pratiche:",
    description: "Seguiamo tutto fino alla messa in funzione",
  },
];

const MethodSection = () => {
  return (
    <section className="section-padding bg-muted">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">
            Il nostro metodo
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div key={step.number} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-16 h-16 bg-primary flex items-center justify-center rounded-lg">
                <span className="text-3xl font-serif text-white">{step.number}</span>
              </div>
              <div className="pt-1">
                <h3 className="text-lg font-serif text-primary font-medium">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MethodSection;
