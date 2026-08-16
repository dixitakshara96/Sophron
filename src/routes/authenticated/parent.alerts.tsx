import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Info, ShieldCheck, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/sophron/AppShell";
import { Panel, Pill } from "@/components/sophron/bits";
import { useSophron } from "@/lib/sophron-store";

export const Route = createFileRoute("/authenticated/parent/alerts")({
  head: () => ({
    meta: [
      { title: "Learning Pattern Alerts — Sophron Parents" },
      { name: "description", content: "Neutral, supportive signals when a child's learning pattern changes." },
      { property: "og:title", content: "Learning Pattern Alerts — Sophron Parents" },
      { property: "og:description", content: "Understand when additional support may be useful." },
    ],
  }),
  component: Alerts,
});

const history = [
  { t: "Today", text: "Change detected in Responsibility response patterns.", tag: "Pattern" },
  { t: "5 days ago", text: "Learning window completed 5 evenings in a row.", tag: "Positive" },
  { t: "2 weeks ago", text: "New chapter Fairness became available for approval.", tag: "Chapter" },
];

function Alerts() {
  const { alertDismissed, dismissAlert } = useSophron();

  return (
    <AppShell variant="parent" title="Alerts" subtitle="Signals, not judgements">
      <div className="space-y-6">
        <Panel title="Learning Pattern Alert">
          {alertDismissed ? (
            <div className="flex items-center gap-3 rounded-2xl border border-leaf/40 bg-leaf/10 p-5">
              <CheckCircle2 className="h-5 w-5 text-leaf" />
              <p className="font-semibold">Alert dismissed. Sophron will keep watching gently in the background.</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-sun/50 bg-sun/10 p-6">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-card shadow-soft">
                  <Bell className="h-5 w-5 text-sun-foreground" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-display text-lg font-bold">A change in recent learning behaviour was detected.</p>
                    <Pill tint="sun">New</Pill>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Responsibility scores have decreased across the last 3 scenarios compared with the
                    previous learning period. Response times were also longer than usual.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      to="/authenticated/parent/performance"
                      className="rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-soft transition hover:brightness-110"
                    >
                      View Report
                    </Link>
                    <button
                      onClick={() => { dismissAlert(); toast("Alert dismissed"); }}
                      className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-bold shadow-soft transition hover:border-primary"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <p className="mt-4 flex items-start gap-2 rounded-2xl bg-muted/60 p-4 text-sm text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            Sophron identifies changes in learning patterns to help parents understand when additional
            support may be useful. It never labels or scores a child's character.
          </p>
        </Panel>

        <Panel title="Alert history">
          <ul className="space-y-3">
            {history.map((h) => (
              <li key={h.text} className="flex flex-wrap items-center gap-3 rounded-2xl border border-border p-4">
                <span className="text-xs font-bold text-muted-foreground">{h.t}</span>
                <span className="flex-1 text-sm font-semibold">{h.text}</span>
                <Pill tint={h.tag === "Positive" ? "leaf" : "sky"}>{h.tag}</Pill>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="How pattern detection works">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { t: "Compare periods", d: "Recent scenario responses are compared with the previous learning period." },
              { t: "Look for shifts", d: "Sophron looks for consistent shifts, not single answers." },
              { t: "Suggest support", d: "You receive a neutral summary plus optional practice suggestions." },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-border bg-soft p-5">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <p className="mt-2 font-display font-bold">{c.t}</p>
                <p className="mt-1 text-sm text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
