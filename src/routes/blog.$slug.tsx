import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { posts } from "@/lib/content";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title.fr} — Djamal TOKO` },
          { name: "description", content: loaderData.excerpt.fr },
          { property: "og:title", content: loaderData.title.fr },
          { property: "og:description", content: loaderData.excerpt.fr },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Article introuvable — Djamal TOKO" }, { name: "robots", content: "noindex" }],
  }),
  component: Post,
});

function Post() {
  const post = Route.useLoaderData();
  const { t, lang } = useLang();
  return (
    <article className="mx-auto max-w-3xl px-6">
      <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> {t({ fr: "Retour au blog", en: "Back to blog" })}
      </Link>
      <Reveal>
        <time className="mt-8 block font-mono text-xs text-gold">
          {new Date(post.date).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", { dateStyle: "long" })}
        </time>
        <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-5xl">{t(post.title)}</h1>
      </Reveal>
      <Reveal delay={150} className="glass mt-10 space-y-5 rounded-2xl p-8 text-lg leading-relaxed">
        {t(post.body).split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </Reveal>
    </article>
  );
}
