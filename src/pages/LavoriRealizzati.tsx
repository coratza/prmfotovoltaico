import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import projectVilla from "@/assets/project-villa-unifamiliare.jpg";
import projectCasa from "@/assets/project-casa-indipendente.jpg";
import projectCapannone from "@/assets/project-capannone.jpg";
import projectBifamiliare from "@/assets/project-bifamiliare.jpg";
import projectAgricola from "@/assets/project-azienda-agricola.jpg";
import projectPiscina from "@/assets/project-villa-piscina.jpg";
import projectVillaModerna from "@/assets/project-villa-moderna.jpg";
import projectMagazzino from "@/assets/project-magazzino.jpg";
import projectCasale from "@/assets/project-casale.jpg";
import projectCondominio from "@/assets/project-condominio.jpg";
import projectPensilina from "@/assets/project-pensilina.jpg";
import projectAgriturismo from "@/assets/project-agriturismo.jpg";
import projectVillettaSchiera from "@/assets/project-villetta-schiera.jpg";
import projectCantina from "@/assets/project-cantina.jpg";
import projectOfficina from "@/assets/project-officina.jpg";
import projectGroundMount from "@/assets/project-ground-mount.jpg";
import projectHotel from "@/assets/project-hotel.jpg";
import projectScuola from "@/assets/project-scuola.jpg";

const projects = [
  {
    image: projectVilla,
    title: "Villa unifamiliare",
    location: "San Lazzaro di Savena (BO)",
    description: "Impianto residenziale con accumulo. Autoconsumo aumentato e gestione completa delle pratiche.",
    type: "Residenziale",
  },
  {
    image: projectCasa,
    title: "Casa indipendente",
    location: "Casalecchio di Reno (BO)",
    description: "Impianto su tetto a falde. Lavoro pulito e tempi rapidi, con collaudo e messa in servizio.",
    type: "Residenziale",
  },
  {
    image: projectCapannone,
    title: "Capannone artigianale",
    location: "Castel San Pietro Terme (BO)",
    description: "Impianto industriale dimensionato sui consumi aziendali. Obiettivo: aumentare l'autoconsumo e ridurre i costi.",
    type: "Industriale",
  },
  {
    image: projectBifamiliare,
    title: "Bifamiliare",
    location: "Pianoro (BO)",
    description: "Soluzione su misura per due unità abitative, con gestione separata e pratica completa.",
    type: "Residenziale",
  },
  {
    image: projectAgricola,
    title: "Azienda agricola",
    location: "Medicina (BO)",
    description: "Impianto su copertura agricola, con studio di fattibilità e ottimizzazione dei consumi in azienda.",
    type: "Agricolo",
  },
  {
    image: projectPiscina,
    title: "Villa con piscina",
    location: "Ozzano dell'Emilia (BO)",
    description: "Impianto residenziale con accumulo per aumentare l'autonomia e coprire carichi elettrici importanti.",
    type: "Residenziale",
  },
  {
    image: projectVillaModerna,
    title: "Villa moderna",
    location: "Valsamoggia (BO)",
    description: "Impianto su tetto in laterizio con pannelli monocristallini ad alta efficienza e sistema di monitoraggio remoto.",
    type: "Residenziale",
  },
  {
    image: projectMagazzino,
    title: "Magazzino logistico",
    location: "Bentivoglio (BO)",
    description: "Grande impianto su copertura piana con oltre 100 kW di potenza installata. Riduzione drastica dei costi energetici.",
    type: "Industriale",
  },
  {
    image: projectCasale,
    title: "Casale di campagna",
    location: "Monteveglio (BO)",
    description: "Installazione su casale ristrutturato, integrazione architettonica e massima resa anche in collina.",
    type: "Residenziale",
  },
  {
    image: projectCondominio,
    title: "Condominio residenziale",
    location: "Imola (BO)",
    description: "Impianto condominiale su tetto piano con ripartizione dei benefici tra le unità abitative.",
    type: "Condominiale",
  },
  {
    image: projectPensilina,
    title: "Pensilina fotovoltaica",
    location: "Zola Predosa (BO)",
    description: "Struttura carport con moduli integrati per produzione energetica e protezione veicoli.",
    type: "Commerciale",
  },
  {
    image: projectAgriturismo,
    title: "Agriturismo",
    location: "Sasso Marconi (BO)",
    description: "Impianto su struttura rurale con ottimizzazione dei consumi per attività ricettiva e agricola.",
    type: "Agricolo",
  },
  {
    image: projectVillettaSchiera,
    title: "Villetta a schiera",
    location: "Budrio (BO)",
    description: "Impianto compatto su tetto a falde in contesto urbano, con gestione pratiche e allaccio in rete.",
    type: "Residenziale",
  },
  {
    image: projectCantina,
    title: "Cantina vinicola",
    location: "Dozza (BO)",
    description: "Impianto su copertura del casale con vista sui vigneti. Autosufficienza energetica per produzione e conservazione.",
    type: "Agricolo",
  },
  {
    image: projectOfficina,
    title: "Officina meccanica",
    location: "Granarolo dell'Emilia (BO)",
    description: "Copertura totale del tetto con moduli fotovoltaici per abbattere i costi di energia dell'attività.",
    type: "Commerciale",
  },
  {
    image: projectGroundMount,
    title: "Impianto a terra",
    location: "Molinella (BO)",
    description: "Installazione a terra su terreno agricolo con strutture inclinate per massimizzare la produzione annua.",
    type: "Agricolo",
  },
  {
    image: projectHotel,
    title: "Struttura ricettiva",
    location: "Porretta Terme (BO)",
    description: "Impianto su hotel con copertura dei consumi per climatizzazione e servizi agli ospiti.",
    type: "Commerciale",
  },
  {
    image: projectScuola,
    title: "Edificio scolastico",
    location: "San Giovanni in Persiceto (BO)",
    description: "Impianto su struttura pubblica con progettazione dedicata e iter autorizzativo completo.",
    type: "Pubblico",
  },
];

const LavoriRealizzati = () => {
  return (
    <Layout>
      <SEOHead
        title="Lavori Realizzati Fotovoltaico Bologna | PRM Fotovoltaico"
        description="Oltre 200 impianti fotovoltaici installati a Bologna e in Emilia-Romagna. Scopri i nostri lavori: ville, capannoni, aziende agricole. PRM Fotovoltaico."
        keywords="lavori fotovoltaico Bologna, impianti fotovoltaici realizzati, portfolio fotovoltaico Emilia Romagna, installazioni fotovoltaico"
        canonicalPath="/lavori-realizzati"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Lavori Realizzati", href: "/lavori-realizzati" },
        ]}
      />
      {/* Hero */}
      <section className="section-padding bg-accent">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              I Nostri Lavori
            </h1>
            <p className="text-xl text-muted-foreground">
              Oltre 200 impianti installati in Emilia-Romagna. Ecco alcuni dei nostri lavori più recenti.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="group bg-card rounded-xl overflow-hidden shadow-soft border border-border hover:shadow-medium transition-all duration-300">
                <div className="relative overflow-hidden">
                   <img
                    src={project.image}
                    alt={`Impianto fotovoltaico ${project.title} a ${project.location} - PRM Fotovoltaico`}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                      {project.type}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-serif font-semibold text-foreground mb-2">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-hero">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Vuoi Vedere il Tuo Impianto Qui?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Contattaci per un sopralluogo gratuito. Potrai avere un impianto come questi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="xl" asChild>
                <a href="tel:+393356117388">
                  <Phone className="w-6 h-6" />
                  Chiama Ora
                </a>
              </Button>
              <Button 
                variant="ctaSecondary" 
                size="lg" 
                className="bg-primary-foreground/10 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link to="/contatti">
                  Richiedi Sopralluogo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LavoriRealizzati;
