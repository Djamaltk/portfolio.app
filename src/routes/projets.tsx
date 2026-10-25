import { createFileRoute } from "@tanstack/react-router";
import { useState, type MouseEvent } from "react";
import { useLang } from "@/lib/i18n";
import { projects } from "@/lib/content";
import { Reveal, SectionTitle } from "@/components/site/Reveal";

export const Route = createFileRoute("/projets")({
  head: () => ({
    meta: [
      { title: "Projets — Djamal TOKO" },
      { name: "description", content: "Les projets web et logiciels réalisés par Djamal TOKO, développeur full stack au Bénin." },
      { property: "og:title", content: "Projets — Djamal TOKO" },
      { property: "og:description", content: "Applications web, API et outils réalisés par Djamal TOKO." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Projects,
});

function TiltCard({ children }: { children: React.ReactNode }) {
  const [s, setS] = useState({ x: 0, y: 0, mx: 50, my: 50 });
  const move = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setS({ x: (py - 0.5) * -8, y: (px - 0.5) * 8, mx: px * 100, my: py * 100 });
  };
  return (
    <div
      onMouseMove={move}
      onMouseLeave={() => setS({ x: 0, y: 0, mx: 50, my: 50 })}
      className="glass relative h-full overflow-hidden rounded-2xl p-7 transition-transform duration-200 hover:shadow-glow"
      style={{ transform: `perspective(900px) rotateX(${s.x}deg) rotateY(${s.y}deg)` }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ background: `radial-gradient(300px at ${s.mx}% ${s.my}%, color-mix(in oklab, var(--primary) 25%, transparent), transparent 70%)` }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

function Projects() {
  const { t } = useLang();
  const tags = ["all", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];
  const [filter, setFilter] = useState("all");
  const list = filter === "all" ? projects : projects.filter((p) => p.tags.includes(filter));

  return (
    <div className="mx-auto max-w-6xl px-6">
      <SectionTitle kicker={t({ fr: "Réalisations", en: "Work" })} title={t({ fr: "Mes projets", en: "My projects" })} />
      <Reveal className="mb-10 flex flex-wrap gap-2">
        {tags.map((tg) => (
          <button
            key={tg}
            onClick={() => setFilter(tg)}
            className={`rounded-full px-4 py-1.5 text-sm transition-all ${filter === tg ? "bg-gradient-primary text-primary-foreground shadow-glow" : "glass text-muted-foreground hover:text-foreground"}`}
          >
            {tg === "all" ? t({ fr: "Tous", en: "All" }) : tg}
          </button>
        ))}
      </Reveal>
      <div className="grid gap-6 md:grid-cols-2">
        {list.map((p, i) => (
          <Reveal key={p.title} delay={i * 80}>
            <TiltCard>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-gold">{p.year}</span>
                <span className="font-mono text-xs text-muted-foreground">0{projects.indexOf(p) + 1}</span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold">{p.title}</h3>
              <p className="mt-3 text-muted-foreground">{t(p.desc)}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((tg) => (
                  <span key={tg} className="rounded-full border px-3 py-1 font-mono text-xs text-primary-glow">{tg}</span>
                ))}
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
