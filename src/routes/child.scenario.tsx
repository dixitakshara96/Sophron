import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight, Star, Trophy, Flame, RefreshCw, Sparkles, Check,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/sophron/AppShell";
import { ProgressBar, SophronBubble } from "@/components/sophron/bits";
import { useSophron } from "@/lib/sophron-store";
import wallet from "@/assets/scenario-wallet.jpg";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/child/scenario")({
  head: () => ({
    meta: [
      { title: "The Lost Wallet — Sophron Scenario" },
      { name: "description", content: "An interactive honesty scenario where Sophron guides reflection, empathy and better choices." },
      { property: "og:title", content: "The Lost Wallet — Sophron Scenario" },
      { property: "og:description", content: "Real situations, empathy and better choices for children." },
    ],
  }),
  component: ScenarioPage,
});

type Stage =
  | "question"
  | "empathy"
  | "perspective"
  | "analogy"
  | "reflection"
  | "retry"
  | "reward";

const options = [
  { id: "A", text: "Try to find the owner", hint: "Take it to a teacher or the police", good: true },
  { id: "B", text: "Keep the money", hint: "Nobody is around to see", good: false },
  { id: "C", text: "Ignore it and walk away", hint: "Leave the wallet where it is", good: false },
];

const feelings = [
  { emoji: "😢", label: "Sad" },
  { emoji: "😟", label: "Worried" },
  { emoji: "😡", label: "Angry" },
  { emoji: "😐", label: "I wouldn't mind" },
];

const reflections = [
  "People deserve their belongings back.",
  "Honest choices build trust.",
  "Keeping something isn't harmful if nobody sees it.",
  "I should think about how others feel.",
];

function StageDots({ stage }: { stage: Stage }) {
  const order: Stage[] = ["question", "empathy", "perspective", "analogy", "reflection", "retry", "reward"];
  const idx = order.indexOf(stage);
  return (
    <div className="flex gap-1.5">
      {order.map((s, i) => (
        <span
          key={s}
          className={cn("h-1.5 rounded-full transition-all", i <= idx ? "w-7 bg-primary" : "w-3 bg-muted")}
        />
      ))}
    </div>
  );
}

function ScenarioPage() {
  const { completeWalletScenario, scenarioSolved } = useSophron();
  const [stage, setStage] = useState<Stage>("question");
  const [feeling, setFeeling] = useState<string | null>(null);
  const [reflection, setReflection] = useState<string | null>(null);
  const [bridge, setBridge] = useState(2);
  const [attempt, setAttempt] = useState(1);

  function choose(id: string) {
    if (id === "A") {
      completeWalletScenario();
      setStage("reward");
      toast.success("+10 Stars earned!", { description: "You thought about how someone else feels." });
    } else {
      setStage("empathy");
    }
  }

  return (
    <AppShell variant="child" title="The Lost Wallet" subtitle="Honesty · Scenario 3 of 10">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="card-soft p-5">
          <div className="flex items-center justify-between text-sm font-bold">
            <span>Scenario 3 of 10</span>
            <span className="text-muted-foreground">Honesty chapter</span>
          </div>
          <div className="mt-3"><ProgressBar value={30} /></div>
          <div className="mt-3"><StageDots stage={stage} /></div>
        </div>

        {(stage === "question" || stage === "retry") && (
          <section className="card-soft overflow-hidden animate-rise">
            <img
              src={wallet}
              alt="A child noticing a wallet on the ground near a playground"
              width={1280}
              height={800}
              className="h-56 w-full object-cover md:h-72"
            />
            <div className="p-6">
              {stage === "retry" && (
                <p className="mb-4 rounded-2xl bg-leaf/10 px-4 py-3 text-sm font-bold text-leaf">
                  Let's try the situation again — you know more now. 🌱
                </p>
              )}
              <h2 className="font-display text-2xl font-extrabold">The Lost Wallet</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                You are walking home from school and find a wallet on the ground. Nobody is around.
                The wallet contains money and an ID card.
              </p>
              <p className="mt-5 font-display text-lg font-bold">What would you do?</p>
              <div className="mt-4 grid gap-3">
                {options.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => {
                      if (stage === "retry") setAttempt(2);
                      choose(o.id);
                    }}
                    className="group flex items-center gap-4 rounded-2xl border-2 border-border bg-card p-4 text-left transition hover:-translate-y-0.5 hover:border-primary hover:shadow-lift"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary font-display text-lg font-bold text-secondary-foreground group-hover:bg-primary group-hover:text-primary-foreground">
                      {o.id}
                    </span>
                    <span>
                      <span className="block font-display text-lg font-bold">{o.text}</span>
                      <span className="block text-sm text-muted-foreground">{o.hint}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {stage === "empathy" && (
          <section className="space-y-5">
            <SophronBubble>
              <p className="font-display text-lg font-bold">Hmm… let's think about this together.</p>
              <p className="mt-2 text-muted-foreground">
                Imagine something important of yours went missing. Someone found it, but decided to keep it.
              </p>
              <p className="mt-3 font-bold">How would YOU feel?</p>
            </SophronBubble>
            <div className="grid gap-3 sm:grid-cols-4">
              {feelings.map((f) => (
                <button
                  key={f.label}
                  onClick={() => { setFeeling(f.label); setStage("perspective"); }}
                  className={cn(
                    "card-soft flex flex-col items-center gap-2 p-5 transition hover:-translate-y-1 hover:border-primary",
                    feeling === f.label && "border-primary",
                  )}
                >
                  <span className="text-3xl">{f.emoji}</span>
                  <span className="font-display font-bold">{f.label}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {stage === "perspective" && (
          <section className="space-y-5 animate-rise">
            <SophronBubble>
              <p>
                Thank you for sharing that you would feel <strong>{feeling?.toLowerCase()}</strong>. That
                feeling is a clue about what matters to people.
              </p>
            </SophronBubble>
            <div className="card-soft overflow-hidden">
              <div className="bg-soft p-6 text-center">
                <p className="font-display text-xl font-bold">
                  Now imagine you are the person who lost the wallet.
                </p>
                <div className="mt-5 flex items-center justify-center gap-5 text-4xl">
                  <span className="animate-float">🧍</span>
                  <span className="text-2xl text-muted-foreground">→</span>
                  <span className="animate-float [animation-delay:0.4s]">😟</span>
                  <span className="text-2xl text-muted-foreground">→</span>
                  <span className="animate-float [animation-delay:0.8s]">🤝</span>
                  <span className="text-2xl text-muted-foreground">→</span>
                  <span className="animate-float [animation-delay:1.2s]">😊</span>
                </div>
              </div>
              <div className="p-6">
                <p className="leading-relaxed text-muted-foreground">
                  The person who lost the wallet may be worried or scared. Returning it could help them
                  feel safe again.
                </p>
                <button
                  onClick={() => setStage("analogy")}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 font-display font-bold text-primary-foreground shadow-lift transition hover:brightness-110"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </section>
        )}

        {stage === "analogy" && (
          <section className="space-y-5 animate-rise">
            <SophronBubble>
              <p className="font-display text-lg font-bold">Think of trust like a bridge.</p>
              <p className="mt-2 text-muted-foreground">
                Every honest choice adds another strong piece to the bridge. Dishonest choices can weaken it.
              </p>
            </SophronBubble>

            <div className="card-soft p-6">
              <div className="flex items-end justify-center gap-1.5">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    className={cn(
                      "w-12 rounded-t-lg transition-all duration-500",
                      i < bridge ? "bg-brand" : "bg-muted",
                    )}
                    style={{ height: `${40 + (i < bridge ? 40 : 0)}px` }}
                  />
                ))}
              </div>
              <div className="mx-auto mt-1 h-2 w-[19.5rem] max-w-full rounded-full bg-secondary" />
              <p className="mt-4 text-center text-sm font-semibold text-muted-foreground">
                Trust bridge strength: {Math.round((bridge / 6) * 100)}%
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setBridge((b) => Math.min(6, b + 1))}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 font-display font-bold shadow-soft transition hover:border-primary"
                >
                  <Sparkles className="h-4 w-4 text-sun-foreground" /> Add an honest choice
                </button>
                <button
                  onClick={() => setStage("reflection")}
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 font-display font-bold text-primary-foreground shadow-lift transition hover:brightness-110"
                >
                  I understand <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </section>
        )}

        {stage === "reflection" && (
          <section className="space-y-5 animate-rise">
            <SophronBubble>
              <p className="font-display text-lg font-bold">What did you learn?</p>
              <p className="mt-1 text-muted-foreground">There is no rush — pick what feels true to you.</p>
            </SophronBubble>
            <div className="grid gap-3">
              {reflections.map((r) => (
                <button
                  key={r}
                  onClick={() => setReflection(r)}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border-2 border-border bg-card p-4 text-left font-semibold transition hover:border-primary",
                    reflection === r && "border-primary bg-primary/5",
                  )}
                >
                  <span className={cn(
                    "grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 border-border",
                    reflection === r && "border-primary bg-primary text-primary-foreground",
                  )}>
                    {reflection === r && <Check className="h-3.5 w-3.5" />}
                  </span>
                  {r}
                </button>
              ))}
            </div>
            {reflection && (
              <div className="card-soft animate-rise p-5">
                <p className="text-muted-foreground">
                  {reflection === "Keeping something isn't harmful if nobody sees it."
                    ? "That's an honest thought — let's explore it. Even when nobody sees, the person who lost the wallet still feels it. Our choices travel further than our eyes do."
                    : "Beautiful reflection. That's exactly the kind of thinking that builds the trust bridge."}
                </p>
                <button
                  onClick={() => setStage("retry")}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 font-display font-bold text-primary-foreground shadow-lift transition hover:brightness-110"
                >
                  <RefreshCw className="h-4 w-4" /> Try the situation again
                </button>
              </div>
            )}
          </section>
        )}

        {stage === "reward" && (
          <section className="card-soft animate-pop overflow-hidden text-center">
            <div className="bg-soft px-6 py-10">
              <p className="text-6xl">🎉</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold">Great thinking!</h2>
              <p className="mt-2 text-muted-foreground">
                {attempt > 1
                  ? "You considered how someone else might feel — and you were brave enough to try again."
                  : "You considered how someone else might feel."}
              </p>
            </div>
            <div className="grid gap-4 p-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-border p-4">
                <Star className="mx-auto h-7 w-7 fill-sun text-sun" />
                <p className="mt-2 font-display text-lg font-bold">+10 Stars</p>
              </div>
              <div className="rounded-2xl border border-border p-4">
                <Trophy className="mx-auto h-7 w-7 text-grape" />
                <p className="mt-2 font-display text-lg font-bold">Honesty Explorer</p>
                <p className="text-xs text-muted-foreground">Badge unlocked</p>
              </div>
              <div className="rounded-2xl border border-border p-4">
                <Flame className="mx-auto h-7 w-7 text-coral" />
                <p className="mt-2 font-display text-lg font-bold">Streak maintained</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3 px-6 pb-7">
              <Link
                to="/child/progress"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-display font-bold text-primary-foreground shadow-lift transition hover:brightness-110"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/child/badges"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 font-display font-bold shadow-soft transition hover:border-primary"
              >
                See my badges
              </Link>
            </div>
          </section>
        )}

        {scenarioSolved && stage !== "reward" && (
          <p className="text-center text-sm text-muted-foreground">
            You already completed this story today — replay it any time.
          </p>
        )}
      </div>
    </AppShell>
  );
}
