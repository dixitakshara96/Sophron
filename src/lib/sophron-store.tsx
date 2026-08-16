import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { child as childData, valueScores as baseScores } from "./sophron-data";

type State = {
  role: "child" | "parent";
  setRole: (r: "child" | "parent") => void;
  stars: number;
  streak: number;
  level: number;
  overall: number;
  scenariosCompleted: number;
  honestyCompleted: number;
  honestyProgress: number;
  unlockedBadges: string[];
  scenarioSolved: boolean;
  alertDismissed: boolean;
  dismissAlert: () => void;
  completeWalletScenario: () => void;
  scores: { value: string; score: number; label: string }[];
};

const Ctx = createContext<State | null>(null);

export function SophronProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<"child" | "parent">("child");
  const [scenarioSolved, setScenarioSolved] = useState(false);
  const [alertDismissed, setAlertDismissed] = useState(false);

  const value = useMemo<State>(() => {
    const bonus = scenarioSolved ? 1 : 0;
    return {
      role,
      setRole,
      stars: childData.stars + bonus * 10,
      streak: childData.streak,
      level: childData.level,
      overall: childData.overall + bonus * 2,
      scenariosCompleted: 18 + bonus,
      honestyCompleted: 8 + bonus,
      honestyProgress: 80 + bonus * 10,
      unlockedBadges: scenarioSolved ? ["honesty-explorer"] : [],
      scenarioSolved,
      alertDismissed,
      dismissAlert: () => setAlertDismissed(true),
      completeWalletScenario: () => setScenarioSolved(true),
      scores: baseScores.map((s) =>
        s.value === "Honesty" && scenarioSolved ? { ...s, score: 88 } : s,
      ),
    };
  }, [role, scenarioSolved, alertDismissed]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSophron() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSophron must be used inside SophronProvider");
  return ctx;
}
