import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/sophron/AppShell";
import { Panel } from "@/components/sophron/bits";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/authenticated/parent/settings")({
  head: () => ({
    meta: [
      { title: "Parent Settings — Sophron" },
      { name: "description", content: "Account details, notification preferences and report delivery for Sophron parents." },
      { property: "og:title", content: "Parent Settings — Sophron" },
      { property: "og:description", content: "Manage your account and notifications." },
    ],
  }),
  component: ParentSettings,
});

function ParentSettings() {
  const [weekly, setWeekly] = useState(true);
  const [alerts, setAlerts] = useState(true);
  const [tips, setTips] = useState(false);
  const [name, setName] = useState("Meera Sharma");
  const [email, setEmail] = useState("meera@example.com");

  return (
    <AppShell variant="parent" title="Settings" subtitle="Account and notifications">
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Account">
          <form
            onSubmit={(e) => { e.preventDefault(); toast.success("Profile saved"); }}
            className="space-y-4"
          >
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-muted-foreground">Parent name</span>
              <input
                value={name} onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-border bg-card px-4 py-2.5 outline-none focus:border-primary"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-muted-foreground">Email</span>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-border bg-card px-4 py-2.5 outline-none focus:border-primary"
              />
            </label>
            <button className="rounded-full bg-brand px-5 py-2.5 font-bold text-primary-foreground shadow-soft transition hover:brightness-110">
              Save changes
            </button>
          </form>
        </Panel>

        <Panel title="Notifications">
          {[
            { label: "Weekly progress report", desc: "Every Sunday evening", state: weekly, set: setWeekly },
            { label: "Learning pattern alerts", desc: "Neutral signals when patterns change", state: alerts, set: setAlerts },
            { label: "Parenting tips from Sophron", desc: "Occasional value-based conversation starters", state: tips, set: setTips },
          ].map((r) => (
            <div key={r.label} className="flex items-center justify-between gap-4 border-b border-border py-4 last:border-0">
              <div>
                <p className="font-semibold">{r.label}</p>
                <p className="text-xs text-muted-foreground">{r.desc}</p>
              </div>
              <Switch checked={r.state} onCheckedChange={(v) => { r.set(v); toast(`${r.label}: ${v ? "on" : "off"}`); }} />
            </div>
          ))}
        </Panel>
      </div>
    </AppShell>
  );
}
