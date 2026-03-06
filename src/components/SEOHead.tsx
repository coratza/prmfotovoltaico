import { useEffect } from "react";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface SoftwareAppSchema {
  name: string;
  description: string;
  url: string;
  category: string;
}

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FAQItem[];
  softwareApp?: SoftwareAppSchema;
}

const SITE_URL = "https://prmfotovoltaico.com";

const SEOHead = ({ title, description, keywords, canonicalPath, breadcrumbs, faqs }: SEOHeadProps) => {
  useEffect(() => {
    document.title = title;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (el) {
        el.setAttribute("content", content);
      } else {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        el.setAttribute("content", content);
        document.head.appendChild(el);
      }
    };

    setMeta("name", "description", description);
    if (keywords) setMeta("name", "keywords", keywords);

    // Open Graph
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", "PRM Fotovoltaico");
    setMeta("property", "og:locale", "it_IT");

    // Twitter
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:card", "summary_large_image");

    // Canonical
    if (canonicalPath) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (link) {
        link.href = `${SITE_URL}${canonicalPath}`;
      } else {
        link = document.createElement("link");
        link.rel = "canonical";
        link.href = `${SITE_URL}${canonicalPath}`;
        document.head.appendChild(link);
      }
    }

    // JSON-LD scripts
    const scripts: HTMLScriptElement[] = [];

    // BreadcrumbList schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: `${SITE_URL}${item.href}`,
        })),
      };
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(breadcrumbSchema);
      document.head.appendChild(script);
      scripts.push(script);
    }

    // FAQ schema
    if (faqs && faqs.length > 0) {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      };
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(faqSchema);
      document.head.appendChild(script);
      scripts.push(script);
    }

    return () => {
      document.title = "PRM Fotovoltaico | Impianti Fotovoltaici Bologna, Modena, Ferrara, Ravenna";
      scripts.forEach((s) => s.remove());
    };
  }, [title, description, keywords, canonicalPath, breadcrumbs, faqs]);

  return null;
};

export default SEOHead;
