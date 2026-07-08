import { useParams, Navigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import Breadcrumb from "@/components/seo/Breadcrumb";
import SEOFAQ from "@/components/seo/SEOFAQ";
import ApprofondimentiCorrelati from "@/components/seo/ApprofondimentiCorrelati";
import CTAConversione from "@/components/seo/CTAConversione";
import { getArticleBySlug } from "@/data/blogArticles";
import { useEffect } from "react";
import { Clock, Calendar } from "lucide-react";

const SITE_URL = "https://prmfotovoltaico.com";

const BlogArticlePage = () => {
  const { slug } = useParams();
  const article = slug ? getArticleBySlug(slug) : undefined;

  useEffect(() => {
    if (!article) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.h1,
      description: article.metaDescription,
      image: `${SITE_URL}${article.cover}`,
      datePublished: article.publishedISO,
      dateModified: article.updatedISO,
      author: { "@type": "Organization", name: "PRM Fotovoltaico", url: SITE_URL },
      publisher: {
        "@type": "Organization",
        name: "PRM Fotovoltaico",
        logo: { "@type": "ImageObject", url: `${SITE_URL}/prm-logo.png` },
      },
      mainEntityOfPage: `${SITE_URL}/blog/${article.slug}`,
    });
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [article]);

  if (!article) return <Navigate to="/blog" replace />;

  return (
    <Layout>
      <SEOHead
        title={article.title}
        description={article.metaDescription}
        keywords={article.keywords}
        canonicalPath={`/blog/${article.slug}`}
        breadcrumbs={[
          { name: "Blog", href: "/blog" },
          { name: article.h1, href: `/blog/${article.slug}` },
        ]}
        faqs={article.faqs}
      />
      <Breadcrumb
        items={[
          { name: "Blog", href: "/blog" },
          { name: article.h1, href: `/blog/${article.slug}` },
        ]}
      />

      <article>
        <header className="py-10 md:py-16 bg-gradient-to-br from-primary/5 to-background">
          <div className="container-custom max-w-3xl">
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
              <Link to="/blog" className="text-primary hover:underline">Blog</Link>
              <span>·</span>
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
                {article.category}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {article.readingTime} min
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-semibold leading-tight mb-4">
              {article.h1}
            </h1>
            <p className="text-lg text-muted-foreground">{article.excerpt}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
              <Calendar className="w-3.5 h-3.5" />
              Aggiornato il {new Date(article.updatedISO).toLocaleDateString("it-IT")}
            </div>
          </div>
        </header>

        <div className="container-custom max-w-3xl py-10 md:py-16">
          <div className="aspect-[16/9] rounded-lg overflow-hidden bg-muted mb-10">
            <img
              src={article.cover}
              alt={article.h1}
              className="w-full h-full object-cover"
              loading="eager"
              width="1200"
              height="675"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed">{article.intro}</p>

            {article.sections.map((s, i) => (
              <div key={i}>
                <h2 className="text-2xl md:text-3xl font-heading font-semibold mt-10 mb-4">
                  {s.h2}
                </h2>
                {s.paragraphs.map((p, j) => (
                  <p key={j} className="text-muted-foreground leading-relaxed mb-4">
                    {p}
                  </p>
                ))}
                {s.bullets && (
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    {s.bullets.map((b, k) => (
                      <li key={k}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <CTAConversione variant="compact" title="Vuoi un preventivo personalizzato?" />
        </div>
      </article>

      <SEOFAQ faqs={article.faqs} />

      <ApprofondimentiCorrelati links={article.correlati} />
    </Layout>
  );
};

export default BlogArticlePage;
