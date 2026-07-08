import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export interface CorrelatoLink {
  title: string;
  description: string;
  href: string;
}

interface Props {
  links: CorrelatoLink[];
  title?: string;
}

const ApprofondimentiCorrelati = ({ links, title = "Approfondimenti correlati" }: Props) => {
  return (
    <section className="py-12 md:py-16 bg-muted/40 border-t">
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-6 md:mb-8 text-center">
          {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="group bg-card border rounded-lg p-5 hover:border-primary hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-base mb-2 group-hover:text-primary transition-colors">
                {l.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">{l.description}</p>
              <span className="text-sm text-primary font-medium inline-flex items-center gap-1">
                Scopri di più <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApprofondimentiCorrelati;
