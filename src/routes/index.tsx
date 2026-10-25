import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Code2, Server, Database, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { profile, skills, projects } from "@/lib/content";
import { Reveal, SectionTitle } from "@/components/site/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Djamal TOKO — Développeur Full Stack & Ingénieur Logiciel" },
      { name: "description", content: "Portfolio de Djamal TOKO, développeur full stack de 16 ans au Bénin : projets, compétences et blog." },
      { property: "og:title", content: "Djamal TOKO — Développeur Full Stack" },
      { property: "og:description", content: "Jeune développeur full stack et ingénieur logiciel au Bénin." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Typed({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[i % words.length];
    const id = setTimeout(() => {
      if (!del && n === w.length) return setDel(true);
      if (del && n === 0) { setDel(false); return setI(i + 1); }
      setN(n + (del ? -1 : 1));
    }, !del && n === w.length ? 1600 : del ? 40 : 80);
    return () => clearTimeout(id);
  }, [n, del, i, words]);
  return (
    <span className="font-mono text-primary-glow">
      {words[i % words.length].slice(0, n)}
      <span className="animate-blink">_</span>
    </span>
  );
}

function Home() {
  const { t, lang } = useLang();
  const words = lang === "fr" ? ["applications web", "API robustes", "interfaces soignées"] : ["web apps", "solid APIs", "polished interfaces"];
  const pillars = [
    { icon: Code2, title: { fr: "Interface", en: "Frontend" }, text: { fr: "Des écrans rapides, beaux et faciles à utiliser.", en: "Fast, beautiful, easy-to-use screens." } },
    { icon: Server, title: { fr: "Serveur", en: "Backend" }, text: { fr: "Une logique solide et des API bien pensées.", en: "Solid logic and well-designed APIs." } },
    { icon: Database, title: { fr: "Données", en: "Data" }, text: { fr: "Des bases de données organisées et sûres.", en: "Organized, secure databases." } },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6">
      {/* Accueil */}
      <section className="relative grid min-h-[80vh] items-center gap-12 md:grid-cols-[1.3fr_1fr]">
        <div>
          <Reveal>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground">
              <span className="size-2 rounded-full bg-gold shadow-glow" />
              {t({ fr: `${profile.age} ans · ${profile.country.fr} · Disponible`, en: `${profile.age} y/o · ${profile.country.en} · Available` })}
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.05] md:text-7xl">
              <span className="text-gradient">{profile.name}</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 font-display text-xl text-muted-foreground md:text-2xl">{t(profile.role)}</p>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-6 text-lg">
              {t({ fr: "Je construis des ", en: "I build " })}
              <Typed words={words} />
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/projets" className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105">
                {t({ fr: "Voir mes projets", en: "See my projects" })}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/contact" className="glass rounded-full px-6 py-3 font-semibold transition-colors hover:bg-accent">
                {t({ fr: "Me contacter", en: "Contact me" })}
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={300} className="relative mx-auto aspect-square w-full max-w-sm">
          <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-primary/30" />
          <div className="absolute inset-8 rounded-full bg-gradient-primary opacity-20 blur-3xl" />
          <div className="glass absolute inset-12 flex animate-float flex-col justify-center rounded-3xl p-6 font-mono text-sm shadow-glow">
            <p className="text-muted-foreground">// djamal.ts</p>
            <p><span className="text-nebula">const</span> dev = {"{"}</p>
            <p className="pl-4">name: <span className="text-gold">"Djamal"</span>,</p>
            <p className="pl-4">age: <span className="text-primary-glow">{profile.age}</span>,</p>
            <p className="pl-4">stack: <span className="text-gold">"full"</span>,</p>
            <p className="pl-4">talent: <span className="text-primary-glow">Infinity</span></p>
            <p>{"}"};</p>
          </div>
        </Reveal>
      </section>

      {/* À propos */}
      <section className="py-24">
        <SectionTitle kicker={t({ fr: "01 — À propos", en: "01 — About" })} title={t({ fr: "Jeune, curieux, déterminé.", en: "Young, curious, driven." })} />
        <Reveal>
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {t({
              fr: "J'ai 16 ans, je vis au Bénin et je suis passionné par la création de logiciels. Je débute, mais j'apprends vite et je m'investis à fond : de l'interface que l'on voit jusqu'au serveur qui fait tout fonctionner.",
              en: "I'm 16, I live in Benin and I'm passionate about building software. I'm a beginner, but I learn fast and give it everything: from the interface you see to the server that makes it all work.",
            })}
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title.fr} delay={i * 120}>
              <div className="glass group h-full rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow">
                <p.icon className="size-8 text-primary-glow transition-transform group-hover:scale-110" />
                <h3 className="mt-4 text-lg font-semibold">{t(p.title)}</h3>
                <p className="mt-2 text-muted-foreground">{t(p.text)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Compétences */}
      <section className="py-24">
        <SectionTitle kicker={t({ fr: "02 — Compétences", en: "02 — Skills" })} title={t({ fr: "Ma boîte à outils", en: "My toolbox" })} />
        <div className="grid gap-6 md:grid-cols-2">
          {skills.map((s, i) => (
            <Reveal key={s.group.fr} delay={i * 100}>
              <div className="glass rounded-2xl p-6">
                <h3 className="font-mono text-sm text-gold">{t(s.group)}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.items.map((it) => (
                    <span key={it} className="rounded-full border px-3 py-1 text-sm transition-colors hover:border-primary hover:text-primary-glow">{it}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Aperçu projets */}
      <section className="py-24">
        <SectionTitle kicker={t({ fr: "03 — Projets", en: "03 — Projects" })} title={t({ fr: "Quelques réalisations", en: "Selected work" })} />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.slice(0, 2).map((p, i) => (
            <Reveal key={p.title} delay={i * 120}>
              <div className="glass h-full rounded-2xl p-6">
                <p className="font-mono text-xs text-muted-foreground">{p.year}</p>
                <h3 className="mt-2 text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-muted-foreground">{t(p.desc)}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <Link to="/projets" className="inline-flex items-center gap-2 text-primary-glow hover:underline">
            {t({ fr: "Tous les projets", en: "All projects" })} <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </section>

      <Reveal>
        <section className="glass relative overflow-hidden rounded-3xl p-10 text-center md:p-16">
          <div className="absolute -top-20 left-1/2 size-72 -translate-x-1/2 rounded-full bg-gradient-primary opacity-25 blur-3xl" />
          <Sparkles className="relative mx-auto size-8 text-gold" />
          <h2 className="relative mt-4 text-3xl font-semibold md:text-4xl">{t({ fr: "Un projet en tête ?", en: "Got a project in mind?" })}</h2>
          <p className="relative mt-3 text-muted-foreground">{t({ fr: "Parlons-en, je réponds rapidement.", en: "Let's talk, I reply quickly." })}</p>
          <Link to="/contact" className="relative mt-8 inline-flex rounded-full bg-gradient-primary px-8 py-3 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105">
            {t({ fr: "Écrivez-moi", en: "Write to me" })}
          </Link>
        </section>
      </Reveal>
    </div>
  );
}
