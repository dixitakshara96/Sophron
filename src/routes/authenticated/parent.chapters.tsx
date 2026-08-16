import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/sophron/AppShell";
import { Panel, ProgressBar, Pill } from "@/components/sophron/bits";
import { Switch } from "@/components/ui/switch";
import { chapters } from "@/lib/sophron-data";

export const Route = createFileRoute("/authenticated/parent/chapters")({
  head: () => ({
    meta: [
      { title: "Chapter Management — Sophron Parents" },
      { name: "description", content: "Enable, disable and assign value chapters for your child's learning plan." },
      { property: "og:title", content: "Chapter Management — Sophron Parents" },
      { property: "og:description", content: "You decide which values your child explores next." },
    ],
  }),
  component: ChapterManagement,
});

function ChapterManagement() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(chapters.map((c) => [c.id, c.id !== "fairness"])),
  );

  return (
    <AppShell variant="parent" title="Chapters" subtitle="Curate what Arjun learns next">
      <Panel title="All chapters" description="Six value chapters, each with age-appropriate scenarios.">
        <div className="grid gap-4">
          {chapters.map((c) => (
            <div key={c.id} className="grid items-center gap-4 rounded-2xl border border-border p-5 md:grid-cols-[1.4fr_1fr_auto]">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-display text-lg font-bold">{c.value}</p>
                  <Pill tint={enabled[c.id] ? "leaf" : "sky"}>{enabled[c.id] ? "Active" : "Paused"}</Pill>
                  <Pill tint={c.accent}>{c.difficulty}</Pill>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{c.blurb}</p>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>Progress</span>
                  <span>{c.progress}%</span>
                </div>
                <div className="mt-1.5"><ProgressBar value={c.progress} tint={c.accent} /></div>
                <p className="mt-1 text-xs text-muted-foreground">{c.completed} of {c.total} scenarios</p>
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={!!enabled[c.id]}
                  onCheckedChange={(v) => {
                    setEnabled((e) => ({ ...e, [c.id]: v }));
                    toast(`${c.value} ${v ? "enabled" : "paused"}`);
                  }}
                />
                <button
                  onClick={() => toast.success(`${c.value} assigned to Arjun`, { description: "It will appear in his Learn tab." })}
                  className="rounded-full bg-brand px-4 py-2 text-sm font-bold text-primary-foreground shadow-soft transition hover:brightness-110"
                >
                  Assign Chapter
                </button>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </AppShell>
  );
}
