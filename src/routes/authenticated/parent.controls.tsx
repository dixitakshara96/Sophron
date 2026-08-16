import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/sophron/AppShell";
import { Panel } from "@/components/sophron/bits";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/authenticated/parent/controls")({
  head: () => ({
    meta: [
      { title: "Parental Controls — Sophron" },
      { name: "description", content: "Set learning access, schedules and content controls for your child on Sophron." },
      { property: "og:title", content: "Parental Controls — Sophron" },
      { property: "og:description", content: "Access, schedule and content controls in one calm place." },
    ],
  }),
  component: Controls,
});

const accessRows = [
  { key: "scenarios", label: "Allow Scenario Learning", desc: "Real-life stories with reflection", on: true },
  { key: "voice", label: "Allow Voice Assistant", desc: "Talk to Sophron companion", on: true },
  { key: "gamification", label: "Allow Gamification", desc: "Stars, streaks and badges", on: true },
  { key: "daily", label: "Allow Daily Challenges", desc: "One short mission each day", on: false },
];

function Controls() {
  const [state, setState] = useState<Record<string, boolean>>(
    Object.fromEntries(accessRows.map((r) => [r.key, r.on])),
  );
  const [start, setStart] = useState("17:00");
  const [end, setEnd] = useState("19:00");
  const [ageSafe, setAgeSafe] = useState(true);
  const [approval, setApproval] = useState(true);

  return (
    <AppShell variant="parent" title="Parental Controls" subtitle="You stay in charge of the experience">
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Learning Access" description="Turn individual experiences on or off.">
          {accessRows.map((r) => (
            <div key={r.key} className="flex items-center justify-between gap-4 border-b border-border py-4 last:border-0">
              <div>
                <p className="font-semibold">{r.label}</p>
                <p className="text-xs text-muted-foreground">{r.desc}</p>
              </div>
              <Switch
                checked={!!state[r.key]}
                onCheckedChange={(v) => { setState((s) => ({ ...s, [r.key]: v })); toast(`${r.label}: ${v ? "on" : "off"}`); }}
              />
            </div>
          ))}
        </Panel>

        <div className="space-y-6">
          <Panel title="Learning Schedule" description="Sophron is only available in this window.">
            <div className="flex flex-wrap items-end gap-4">
              <label className="flex-1">
                <span className="mb-1.5 block text-xs font-bold text-muted-foreground">Start</span>
                <input
                  type="time" value={start} onChange={(e) => setStart(e.target.value)}
                  className="w-full rounded-xl border border-border bg-card px-4 py-2.5 font-semibold outline-none focus:border-primary"
                />
              </label>
              <label className="flex-1">
                <span className="mb-1.5 block text-xs font-bold text-muted-foreground">End</span>
                <input
                  type="time" value={end} onChange={(e) => setEnd(e.target.value)}
                  className="w-full rounded-xl border border-border bg-card px-4 py-2.5 font-semibold outline-none focus:border-primary"
                />
              </label>
              <button
                onClick={() => toast.success("Learning schedule saved")}
                className="rounded-full bg-brand px-5 py-2.5 font-bold text-primary-foreground shadow-soft transition hover:brightness-110"
              >
                Save
              </button>
            </div>
            <p className="mt-4 flex items-center gap-2 rounded-2xl bg-muted/60 p-4 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" /> Currently active from 5:00 PM to 7:00 PM on weekdays.
            </p>
          </Panel>

          <Panel title="Content Controls">
            <div className="flex items-center justify-between border-b border-border py-4">
              <div>
                <p className="font-semibold">Age-appropriate content</p>
                <p className="text-xs text-muted-foreground">Scenarios tuned for ages 8–11</p>
              </div>
              <Switch checked={ageSafe} onCheckedChange={(v) => { setAgeSafe(v); toast("Content setting updated"); }} />
            </div>
            <div className="flex items-center justify-between py-4">
              <div>
                <p className="font-semibold">Parent approval for new chapters</p>
                <p className="text-xs text-muted-foreground">New values need your confirmation first</p>
              </div>
              <Switch checked={approval} onCheckedChange={(v) => { setApproval(v); toast("Approval setting updated"); }} />
            </div>
            <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
              Changes apply to Arjun's next session.
            </p>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}
