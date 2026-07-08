import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav aria-label="Breadcrumb" className="bg-muted/40 border-b">
      <div className="container-custom py-3">
        <ol className="flex flex-wrap items-center gap-1 text-xs md:text-sm text-muted-foreground">
          <li className="flex items-center">
            <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span className="sr-only md:not-sr-only">Home</span>
            </Link>
          </li>
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1">
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                {isLast ? (
                  <span className="text-foreground font-medium truncate max-w-[200px] md:max-w-none" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link to={item.href} className="hover:text-primary transition-colors truncate max-w-[120px] md:max-w-none">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
