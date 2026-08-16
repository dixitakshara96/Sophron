import { useEffect, useState } from "react";
import { Copy, Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Panel } from "@/components/sophron/bits";

type ChildRow = { id: string; child_code: string; name: string; age: number | null; avatar: string };

// Initial mock data to display something on load
const INITIAL_MOCK_CHILDREN: ChildRow[] = [
  { id: "1", child_code: "KID-5892", name: "Arjun", age: 9, avatar: "" },
  { id: "2", child_code: "KID-3411", name: "Ananya", age: 12, avatar: "" }
];

export function FamilyAccess() {
  // Hardcoded Parent ID string for instant mock testing
  const [parentCode, setParentCode] = useState<string | null>("PAR-99482");
  const [children, setChildren] = useState<ChildRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [saving, setSaving] = useState(false);

  // 1. Simulates loading your dummy account data
  async function load() {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600)); // Quick visual loader simulation
    setChildren(INITIAL_MOCK_CHILDREN);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  // 2. Simulates adding a child straight to local state
  async function addChild(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed || trimmed.length > 60) {
      toast.error("Enter a name (up to 60 characters)");
      return;
    }
    const parsedAge = age ? Number(age) : null;
    if (parsedAge !== null && (Number.isNaN(parsedAge) || parsedAge < 3 || parsedAge > 18)) {
      toast.error("Age should be between 3 and 18");
      return;
    }
    
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 400)); // Simulated network lag

    // Create a dummy child object matching your Type interface
    const newChild: ChildRow = {
      id: Math.random().toString(),
      child_code: `KID-${Math.floor(1000 + Math.random() * 9000)}`, // Generates random 4 digit code
      name: trimmed,
      age: parsedAge,
      avatar: ""
    };

    setChildren((prev) => [...prev, newChild]);
    setSaving(false);
    
    setName("");
    setAge("");
    toast.success("Child added — a unique Child ID was generated.");
  }

  // 3. Simulates deleting a child right out of local state
  async function removeChild(id: string) {
    setChildren((c) => c.filter((x) => x.id !== id));
    toast.success("Child removed from view.");
  }

  function copy(value: string) {
    void navigator.clipboard.writeText(value);
    toast.success(`Copied ${value}`);
  }

  return (
    <Panel title="Family access IDs">
      {loading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading your family account…
        </div>
      ) : (
        <div className="space-y-5">
          <div className="rounded-2xl border border-border bg-soft p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Your Parent ID</p>
            <div className="mt-1.5 flex items-center gap-3">
              <span className="font-mono text-xl font-bold tracking-wider text-brand">{parentCode}</span>
              <button
                type="button"
                onClick={() => parentCode && copy(parentCode)}
                className="rounded-full border border-border bg-card p-2 shadow-soft transition hover:border-primary/50"
                aria-label="Copy Parent ID"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Children sign in with this Parent ID plus their own Child ID.
            </p>
          </div>

          <div className="space-y-3">
            {children.length === 0 && (
              <p className="text-sm text-muted-foreground">No children yet — add your first one below.</p>
            )}
            {children.map((c) => (
              <div
                key={c.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border p-4 shadow-soft"
              >
                <div>
                  <p className="font-display font-bold">
                    {c.name}
                    {c.age ? <span className="text-muted-foreground"> · Age {c.age}</span> : null}
                  </p>
                  <p className="mt-0.5 font-mono text-sm tracking-wider text-primary">{c.child_code}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => copy(c.child_code)}
                    className="rounded-full border border-border p-2 transition hover:border-primary/50"
                    aria-label={`Copy Child ID for ${c.name}`}
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => void removeChild(c.id)}
                    className="rounded-full border border-border p-2 text-coral transition hover:border-coral/60"
                    aria-label={`Remove ${c.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={addChild} className="flex flex-wrap items-end gap-3">
            <label className="min-w-[12rem] flex-1">
              <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Child name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={60}
                placeholder="Arjun"
                className="mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-2.5 outline-none"
              />
            </label>
            <label className="w-24">
              <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Age</span>
              <input
                value={age}
                onChange={(e) => setAge(e.target.value.replace(/\D/g, "").slice(0, 2))}
                inputMode="numeric"
                placeholder="9"
                className="mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-2.5 outline-none"
              />
            </label>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-full bg-brand px-5 py-3 font-display font-bold text-primary-foreground shadow-soft transition hover:brightness-110 disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Add child
            </button>
          </form>
        </div>
      )}
    </Panel>
  );
}

