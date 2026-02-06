const partners = [
  { name: "Growatt", color: "from-primary to-detail" },
  { name: "Zucchetti", color: "from-primary to-detail" },
  { name: "Huawei", color: "from-primary to-detail" },
];

const PartnersSection = () => {
  return (
    <section className="section-padding bg-accent">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-light text-primary mb-4">
            I Partner Tecnologici
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Per i nostri impianti utilizziamo le componenti
            dei migliori produttori nel settore fotovoltaico.
            <br />
            La scelta dei materiali è parte integrante del progetto.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="bg-gradient-to-br from-primary to-detail rounded-2xl p-8 flex items-center justify-center h-32 shadow-soft"
            >
              <span className="text-primary-foreground text-2xl font-heading font-medium tracking-wide">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
