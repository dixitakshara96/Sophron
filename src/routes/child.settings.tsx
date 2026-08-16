import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/sophron/AppShell";
import { Panel } from "@/components/sophron/bits";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export const Route = createFileRoute("/child/settings")({
  head: () => ({
    meta: [
      { title: "Child Settings — Sophron" },
      { name: "description", content: "Sound, reminders and avatar preferences for the Sophron child experience." },
      { property: "og:title", content: "Child Settings — Sophron" },
      { property: "og:description", content: "Simple, child-safe preferences." },
    ],
  }),
  component: ChildSettings,
});

const avatars = ["🦊", "🐼", "🦉", "🐢", "🐝", "🐬"];

function ChildSettings() {
  const [avatar, setAvatar] = useState("🦉");
  const [sound, setSound] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [music, setMusic] = useState(false);

  return (
    <AppShell variant="child" title="Settings" subtitle="Make Sophron feel like yours">
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Choose your avatar">
          <div className="flex flex-wrap gap-3">
            {avatars.map((a) => (
              <button
                key={a}
                onClick={() => { setAvatar(a); toast.success("Avatar updated"); }}
                className={`grid h-16 w-16 place-items-center rounded-2xl border-2 text-3xl transition hover:-translate-y-1 ${
                  avatar === a ? "border-primary bg-primary/5" : "border-border"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </Panel>
        <Panel title="Sound & reminders">
          {[
            { label: "Sound effects", state: sound, set: setSound },
            { label: "Daily learning reminder", state: reminders, set: setReminders },
            { label: "Background music", state: music, set: setMusic },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between border-b border-border py-4 last:border-0">
              <span className="font-semibold">{row.label}</span>
              <Switch checked={row.state} onCheckedChange={(v) => { row.set(v); toast(`${row.label} ${v ? "on" : "off"}`); }} />
            </div>
          ))}
          <p className="mt-3 text-xs text-muted-foreground">
            Some settings are managed by your parent in Parent Controls.
          </p>
        </Panel>
      </div>
    </AppShell>
  );
}
