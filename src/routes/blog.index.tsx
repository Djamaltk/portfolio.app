import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { posts } from "@/lib/content";
import { Reveal, SectionTitle } from "@/components/site/Reveal";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Djamal TOKO" },
      { name: "description", content: "Articles de Djamal TOKO sur le développement web, le code et son parcours de jeune développeur." },
      { property: "og:title", content: "Blog — Djamal TOKO" },
      { property: "og:description", content: "Réflexions et apprentissages d'un jeune développeur full stack." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Blog,
});

function Blog() {
  const { t, lang } = useLang();
  return (
    <div className="mx-auto max-w-4xl px-6">
      <SectionTitle kicker="Blog" title={t({ fr: "Articles & réflexions", en: "Articles & thoughts" })} />
      <div className="space-y-6">
        {posts.map((p, i) => (
          <Reveal key={p.slug} delay={i * 100}>
            <Link to="/blog/$slug" params={{ slug: p.slug }} className="glass group block rounded-2xl p-7 transition-all hover:-translate-y-1 hover:shadow-glow">
              <time className="font-mono text-xs text-gold">
                {new Date(p.date).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", { dateStyle: "long" })}
              </time>
              <h3 className="mt-2 text-2xl font-semibold">{t(p.title)}</h3>
              <p className="mt-2 text-muted-foreground">{t(p.excerpt)}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm text-primary-glow">
                {t({ fr: "Lire l'article", en: "Read article" })}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
