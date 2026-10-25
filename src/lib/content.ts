import type { L } from "./i18n";

export const profile = {
  name: "Djamal TOKO",
  age: 16,
  country: { fr: "Bénin", en: "Benin" } as L,
  role: { fr: "Développeur Full Stack & Ingénieur Logiciel", en: "Full Stack Developer & Software Engineer" } as L,
};

export const skills = [
  { group: { fr: "Interface", en: "Frontend" } as L, items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Tailwind CSS"] },
  { group: { fr: "Serveur", en: "Backend" } as L, items: ["Node.js", "Express", "API REST", "Python"] },
  { group: { fr: "Données", en: "Data" } as L, items: ["SQL", "PostgreSQL", "MongoDB"] },
  { group: { fr: "Outils", en: "Tools" } as L, items: ["Git", "GitHub", "VS Code", "Figma"] },
];

// Projets d'exemple — à remplacer par les vrais projets de Djamal.
export const projects = [
  {
    title: "Nova Tasks",
    desc: { fr: "Gestionnaire de tâches avec glisser-déposer, catégories et mode hors ligne.", en: "Task manager with drag and drop, categories and offline mode." } as L,
    tags: ["React", "TypeScript", "Tailwind"],
    year: "2026",
  },
  {
    title: "Marché Connect",
    desc: { fr: "Mini-boutique en ligne pour les commerçants locaux, avec panier et suivi des commandes.", en: "Small online shop for local merchants, with cart and order tracking." } as L,
    tags: ["Node.js", "Express", "PostgreSQL"],
    year: "2026",
  },
  {
    title: "Météo Bénin",
    desc: { fr: "Application météo pour les villes du Bénin, consommant une API publique.", en: "Weather app for cities in Benin, using a public API." } as L,
    tags: ["JavaScript", "API REST", "CSS"],
    year: "2025",
  },
  {
    title: "CodeQuiz",
    desc: { fr: "Quiz interactif pour apprendre la programmation, avec scores et classement.", en: "Interactive quiz to learn programming, with scores and leaderboard." } as L,
    tags: ["React", "MongoDB"],
    year: "2025",
  },
];

// Articles d'exemple — à remplacer.
export const posts = [
  {
    slug: "coder-a-16-ans",
    date: "2026-09-12",
    title: { fr: "Coder à 16 ans au Bénin : mon parcours", en: "Coding at 16 in Benin: my journey" } as L,
    excerpt: { fr: "Comment j'ai écrit ma première ligne de code et ce que j'ai appris depuis.", en: "How I wrote my first line of code and what I've learned since." } as L,
    body: {
      fr: "Tout a commencé avec une simple page HTML.\n\nJ'ai vite compris qu'un site web, c'est une conversation entre l'interface et le serveur. J'ai donc appris les deux.\n\nMon conseil : construisez de vrais projets, même petits. C'est en se trompant qu'on progresse le plus vite.",
      en: "It all started with a simple HTML page.\n\nI quickly understood that a website is a conversation between the interface and the server. So I learned both.\n\nMy advice: build real projects, even small ones. Making mistakes is the fastest way to grow.",
    } as L,
  },
  {
    slug: "pourquoi-typescript",
    date: "2026-07-03",
    title: { fr: "Pourquoi je suis passé à TypeScript", en: "Why I switched to TypeScript" } as L,
    excerpt: { fr: "Moins de bugs, plus de confiance : ce que les types ont changé pour moi.", en: "Fewer bugs, more confidence: what types changed for me." } as L,
    body: {
      fr: "JavaScript est génial, mais les erreurs arrivent souvent trop tard.\n\nAvec TypeScript, l'éditeur me prévient avant même que je lance le code. Résultat : je code plus vite et plus sereinement.",
      en: "JavaScript is great, but errors often show up too late.\n\nWith TypeScript, my editor warns me before I even run the code. The result: I code faster and with more confidence.",
    } as L,
  },
];
