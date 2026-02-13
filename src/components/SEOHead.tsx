import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
}

const SEOHead = ({ title, description, keywords }: SEOHeadProps) => {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (el) {
        el.setAttribute("content", content);
      } else {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        el.setAttribute("content", content);
        document.head.appendChild(el);
      }
    };

    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);

    return () => {
      // Reset to defaults on unmount
      document.title = "PRM Fotovoltaico | Impianti Fotovoltaici Bologna, Modena, Ferrara, Ravenna";
    };
  }, [title, description, keywords]);

  return null;
};

export default SEOHead;
