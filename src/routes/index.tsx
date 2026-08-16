import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, BookOpen, HeartHandshake, Sparkles, Compass, ShieldCheck, MessageCircleHeart,
} from "lucide-react";
import logoAsset from "@/assets/sophron-logo.png";
import hero from "@/assets/hero-learning.jpg";
import { RoleSwitcher } from "@/components/sophron/AppShell";
import { GpsForLife } from "@/components/sophron/GpsForLife";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sophron — Real situations. Real learning. Better choices." },
      {
        name: "description",
        content:
          "Sophron is a child-focused moral learning platform teaching values through real-life situations, empathy, reflection and personalized learning.",
      },
      { property: "og:title", content: "Sophron — Real situations. Real learning. Better choices." },
      {
        property: "og:description",
        content: "Moral learning for children through empathy, reflection and better choices.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: BookOpen, title: "Learn", text: "Real-life situations children actually meet at school and home.", tint: "text-primary bg-primary/10" },
  { icon: HeartHandshake, title: "Reflect", text: "Understand the impact of a choice on the people around you.", tint: "text-coral bg-coral/10" },
  { icon: Sparkles, title: "Grow", text: "Build stronger values with stars, badges and gentle guidance.", tint: "text-grape bg-grape/10" },
];

const steps = ["Situation", "Choice", "Reflection", "Empathy", "Learning"];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <div className="flex items-center gap-3">
            <img src={logoAsset} alt="Sophron logo" className="h-12 w-auto" width={1248} height={1248} />
            <div className="hidden leading-tight sm:block">
              <p className="font-display text-xl font-bold text-brand">Sophron</p>
              <p className="text-[11px] font-semibold text-muted-foreground">Ethos, Pathos and Logos</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/authenticated/parent"
              className="hidden rounded-full px-4 py-2 text-sm font-bold text-muted-foreground transition hover:text-foreground sm:block"
            >
              For Parents
            </Link>
            <Link
              to="/auth"
              className="rounded-full bg-brand px-4 py-2 text-sm font-bold text-primary-foreground shadow-soft transition hover:brightness-110"
            >
              Sign in
            </Link>
            <RoleSwitcher />
          </div>
        </div>
      </header>

      <section className="bg-soft">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:py-20 lg:grid-cols-2">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-bold text-primary shadow-soft">
              <Compass className="h-4 w-4" /> A GPS for life, not a rulebook
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] md:text-5xl lg:text-[3.4rem]">
              Real situations. <span className="text-brand">Real learning.</span> Better choices.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Sophron helps children understand moral values through real-life situations, empathy,
              reflection and personalized learning — never through judgement.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/child"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 font-display text-base font-bold text-primary-foreground shadow-lift transition hover:brightness-110"
              >
                Start Learning <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/authenticated/parent"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 font-display text-base font-bold shadow-soft transition hover:border-primary/50"
              >
                Explore for Parents
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-5 text-sm font-semibold text-muted-foreground">
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-leaf" /> Privacy by design</span>
              <span className="flex items-center gap-2"><MessageCircleHeart className="h-4 w-4 text-coral" /> Empathy-first responses</span>
            </div>
          </div>
          <div className="relative animate-rise">
            <div className="absolute -inset-3 rounded-[2.5rem] bg-brand opacity-15 blur-2xl" />
            <img
              src={hero}
              alt="Children learning together with a friendly Sophron companion"
              width={1280}
              height={912}
              className="relative w-full rounded-[2rem] border border-border object-cover shadow-lift"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="card-soft p-6 transition hover:-translate-y-1 hover:shadow-lift">
              <span className={`grid h-12 w-12 place-items-center rounded-2xl ${f.tint}`}>
                <f.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-xl font-bold">{f.title}</h3>
              <p className="mt-1.5 text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <h2 className="text-center font-display text-3xl font-extrabold">How Sophron Works</h2>
        <p className="mt-2 text-center text-muted-foreground">
          Every scenario follows the same gentle loop.
        </p>
        <ol className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-3">
              <span className="card-soft px-5 py-3 font-display font-bold">
                <span className="mr-2 text-primary">{i + 1}</span>
                {s}
              </span>
              {i < steps.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
            </li>
          ))}
        </ol>
      </section>

      <GpsForLife />

      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-5 py-10 text-center">
          <p className="font-display text-xl font-bold text-brand">
            Don't just teach children what is right. Help them understand why.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Sophron · Ethos, Pathos and Logos · Prototype for demonstration purposes
          </p>
        </div>
      </footer>
    </div>
  );
}
