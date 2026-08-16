import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { AppShell } from "@/components/sophron/AppShell";
import { Panel, ProgressBar } from "@/components/sophron/bits";
import { badges } from "@/lib/sophron-data";
import { useSophron } from "@/lib/sophron-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/child/badges")({
  head: () => ({
    meta: [
      { title: "Badge Collection — Sophron" },
      { name: "description", content: "Arjun's Sophron badge collection: honesty, empathy, kindness and growth mindset rewards." },
      { property: "og:title", content: "Badge Collection — Sophron" },
      { property: "og:description", content: "Collect badges for empathy, honesty, kindness and growth." },
    ],
  }),
  component: Badges,
});

function Badges() {
  const { unlockedBadges } = useSophron();
  const all = badges.map((b) => ({ ...b, unlocked: b.unlocked || unlockedBadges.includes(b.id) }));
  const count = all.filter((b) => b.unlocked).length;

  return (
    <AppShell variant="child" title="Badges" subtitle="Your collection of good choices">
      <Panel title={`${count} of ${all.length} badges unlocked`} description="Each badge celebrates a habit, not a score.">
        <ProgressBar value={(count / all.length) * 100} tint="sun" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {all.map((b) => (
            <div
              key={b.id}
              className={cn(
                "rounded-2xl border p-5 text-center transition",
                b.unlocked
                  ? "border-border bg-card shadow-soft hover:-translate-y-1 hover:shadow-lift animate-pop"
                  : "border-dashed border-border bg-muted/40",
              )}
            >
              <span className={cn("block text-4xl", !b.unlocked && "opacity-30 grayscale")}>{b.emoji}</span>
              <p className="mt-3 font-display font-bold">{b.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{b.desc}</p>
              {!b.unlocked && (
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-muted-foreground">
                  <Lock className="h-3 w-3" /> Locked
                </span>
              )}
            </div>
          ))}
        </div>
      </Panel>
    </AppShell>
  );
}
