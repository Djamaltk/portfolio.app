import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Starfield } from "./Starfield";

const nav = [
  { to: "/", label: { fr: "Accueil", en: "Home" } },
  { to: "/projets", label: { fr: "Projets", en: "Projects" } },
  { to: "/blog", label: { fr: "Blog", en: "Blog" } },
  { to: "/contact", label: { fr: "Contact", en: "Contact" } },
] as const;

function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div className="glass flex rounded-full p-1 font-mono text-xs" role="group" aria-label="Langue / Language">
      {(["fr", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-3 py-1 uppercase transition-colors ${lang === l ? "bg-gradient-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Starfield />
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
        <div className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ${scrolled ? "glass mx-4 shadow-glow md:mx-auto" : ""}`}>
          <Link to="/" className="font-display text-lg font-semibold">
            DT<span className="text-gold">.</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "!text-foreground bg-accent" }}
              >
                {t(n.label)}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <LangSwitch />
            <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="glass mx-4 mt-2 flex flex-col rounded-2xl p-2 md:hidden">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm hover:bg-accent">
                {t(n.label)}
              </Link>
            ))}
          </nav>
        )}
      </header>
      <main className="pt-28">{children}</main>
      <footer className="mt-32 border-t py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Djamal TOKO — {t({ fr: "Conçu et codé au Bénin", en: "Designed and coded in Benin" })}</p>
          <p className="font-mono text-xs">{"<"}full-stack {"/>"}</p>
        </div>
      </footer>
    </div>
  );
}
