import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import Breadcrumb from "@/components/seo/Breadcrumb";
import CTAConversione from "@/components/seo/CTAConversione";
import { Link } from "react-router-dom";
import { Clock, ArrowRight, BookOpen } from "lucide-react";
import { blogArticles } from "@/data/blogArticles";

const Blog = () => {
  return (
    <Layout>
      <SEOHead
        title="Blog Fotovoltaico | Guide e Consigli PRM"
        description="Guide, analisi e consigli pratici sul fotovoltaico: costi, resa, accumulo, incentivi e ROI. Contenuti utili per famiglie e imprese in Emilia-Romagna."
        keywords="blog fotovoltaico, guide fotovoltaico, articoli fotovoltaico, consigli fotovoltaico"
        canonicalPath="/blog"
        breadcrumbs={[{ name: "Blog", href: "/blog" }]}
      />
      <Breadcrumb items={[{ name: "Blog", href: "/blog" }]} />

      <section className="py-14 md:py-20 bg-gradient-to-br from-primary/5 to-background">
        <div className="container-custom text-center max-w-2xl">
          <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-heading font-semibold mb-3">
            Blog Fotovoltaico
          </h1>
          <p className="text-lg text-muted-foreground">
            Guide, analisi e consigli pratici per capire davvero se, come e quando conviene il fotovoltaico.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogArticles.map((article) => (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                className="group bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="aspect-[16/9] overflow-hidden bg-muted">
                  <img
                    src={article.cover}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width="640"
                    height="360"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {article.readingTime} min
                    </span>
                  </div>
                  <h2 className="text-xl font-heading font-semibold mb-2 group-hover:text-primary transition-colors leading-tight">
                    {article.h1}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <span className="text-sm text-primary font-medium inline-flex items-center gap-1">
                    Leggi l'articolo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTAConversione />
    </Layout>
  );
};

export default Blog;
