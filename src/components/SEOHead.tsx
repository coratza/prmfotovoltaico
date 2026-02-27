import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
}

const SITE_URL = "https://prmfotovoltaico.com";

const SEOHead = ({ title, description, keywords, canonicalPath }: SEOHeadProps) => {
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

    return () => {
      document.title = "PRM Fotovoltaico | Impianti Fotovoltaici Bologna, Modena, Ferrara, Ravenna";
    };
  }, [title, description, keywords, canonicalPath]);

  return null;
};

export default SEOHead;
