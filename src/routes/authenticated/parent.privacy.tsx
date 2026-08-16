import { createFileRoute } from "@tanstack/react-router";
import { KeyRound, Lock, Users, Package, Ban, Trash2, Info } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/sophron/AppShell";
import { Panel } from "@/components/sophron/bits";

export const Route = createFileRoute("/authenticated/parent/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy by Design — Sophron" },
      { name: "description", content: "How Sophron protects children's data: minimal collection, parent-controlled access and deletion controls." },
      { property: "og:title", content: "Privacy by Design — Sophron" },
      { property: "og:description", content: "Privacy practices explained in plain language." },
    ],
  }),
  component: Privacy,
});

const cards = [
  { icon: KeyRound, title: "Secure Authentication", text: "Parent accounts protected with modern sign-in and optional 2FA.", tint: "text-primary bg-primary/10" },
  { icon: Lock, title: "Encrypted Data", text: "Learning data is encrypted in transit and at rest.", tint: "text-grape bg-grape/10" },
  { icon: Users, title: "Parent-Controlled Access", text: "You choose chapters, schedules and which features are on.", tint: "text-sky bg-sky/10" },
  { icon: Package, title: "Minimal Data Collection", text: "We store only what is needed to personalize learning.", tint: "text-leaf bg-leaf/10" },
  { icon: Ban, title: "No Unnecessary Data Sharing", text: "No selling of data and no advertising profiles for children.", tint: "text-coral bg-coral/10" },
  { icon: Trash2, title: "Data Deletion Controls", text: "Export or delete your child's learning history at any time.", tint: "text-sun-foreground bg-sun/20" },
];

function Privacy() {
  return (
    <AppShell variant="parent" title="Privacy & Security" subtitle="Privacy by design, explained simply">
      <div className="space-y-6">
        <section className="card-soft bg-soft p-8 text-center">
          <h2 className="font-display text-3xl font-extrabold">Privacy by Design</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Sophron analyzes learning behaviour to personalize education — not to label the child.
          </p>
        </section>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((c) => (
            <div key={c.title} className="card-soft p-6 transition hover:-translate-y-1 hover:shadow-lift">
              <span className={`grid h-12 w-12 place-items-center rounded-2xl ${c.tint}`}>
                <c.icon className="h-6 w-6" />
              </span>
              <p className="mt-4 font-display text-lg font-bold">{c.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>

        <Panel title="Your data controls">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => toast.success("Export requested", { description: "A copy will be emailed to you (simulated)." })}
              className="rounded-full border border-border bg-card px-5 py-2.5 font-bold shadow-soft transition hover:border-primary"
            >
              Export learning history
            </button>
            <button
              onClick={() => toast("Deletion request opened", { description: "You would confirm this by email (simulated)." })}
              className="rounded-full border border-destructive/40 bg-card px-5 py-2.5 font-bold text-destructive shadow-soft transition hover:bg-destructive/5"
            >
              Delete child data
            </button>
          </div>
          <p className="mt-5 flex items-start gap-2 rounded-2xl bg-muted/60 p-4 text-sm text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            No system can promise perfect security. Sophron follows a minimal-data approach, reviews its
            practices regularly, and gives parents the final say over what is collected and kept.
          </p>
        </Panel>
      </div>
    </AppShell>
  );
}
