import logoGrowatt from "@/assets/logo-growatt.png";
import logoZucchetti from "@/assets/logo-zucchetti.png";
import logoHuawei from "@/assets/logo-huawei.png";
import logoSma from "@/assets/logo-sma.png";

const partners = [
  { name: "Growatt", logo: logoGrowatt },
  { name: "Zucchetti", logo: logoZucchetti },
  { name: "Huawei", logo: logoHuawei },
  { name: "SMA", logo: logoSma },
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

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="bg-card border border-border rounded-2xl p-8 flex items-center justify-center h-32 shadow-soft"
            >
              <img
                src={partner.logo}
                alt={`Logo ${partner.name}`}
                className="max-h-16 max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
