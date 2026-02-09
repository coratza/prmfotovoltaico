const steps = [
  { num: "1", title: "Primo contatto:", description: "Raccogliamo le informazioni essenziali." },
  { num: "2", title: "Sopralluogo tecnico:", description: "Analizziamo tetto, struttura e consumi." },
  { num: "3", title: "Progetto su misura:", description: "Dimensioniamo l'impianto in modo coerente." },
  { num: "4", title: "Installazione e pratiche:", description: "Seguiamo tutto fino alla messa in funzione." },
];

const MethodSection = () => {
  return (
    <section className="section-padding bg-accent">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-heading font-light text-primary text-center mb-12">
          Il nostro metodo
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div key={step.num} className="bg-card rounded-2xl p-6 shadow-soft border border-border text-center">
              <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading text-2xl font-light mx-auto mb-4">
                {step.num}
              </div>
              <h3 className="font-heading text-lg font-normal text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MethodSection;
