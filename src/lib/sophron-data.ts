export type ValueKey =
  | "Honesty"
  | "Empathy"
  | "Kindness"
  | "Respect"
  | "Responsibility"
  | "Fairness";

export const child = {
  name: "Arjun",
  age: 10,
  level: 4,
  stars: 120,
  streak: 7,
  overall: 82,
  lastActive: "Today, 5:42 PM",
};

export const valueScores: { value: ValueKey; score: number; label: string }[] = [
  { value: "Honesty", score: 85, label: "Strong" },
  { value: "Empathy", score: 72, label: "Developing" },
  { value: "Kindness", score: 78, label: "Developing" },
  { value: "Respect", score: 91, label: "Strong" },
  { value: "Responsibility", score: 65, label: "Needs Practice" },
];

export type Chapter = {
  id: string;
  value: ValueKey;
  blurb: string;
  completed: number;
  total: number;
  progress: number;
  difficulty: "Easy" | "Medium" | "Growing";
  accent: "primary" | "grape" | "coral" | "sky" | "leaf" | "sun";
};

export const chapters: Chapter[] = [
  { id: "honesty", value: "Honesty", blurb: "Truth, trust and doing the right thing", completed: 8, total: 10, progress: 80, difficulty: "Medium", accent: "primary" },
  { id: "empathy", value: "Empathy", blurb: "Understanding how others feel", completed: 5, total: 8, progress: 62, difficulty: "Easy", accent: "coral" },
  { id: "kindness", value: "Kindness", blurb: "Small actions that help someone's day", completed: 6, total: 9, progress: 67, difficulty: "Easy", accent: "sun" },
  { id: "respect", value: "Respect", blurb: "Valuing people, rules and differences", completed: 9, total: 10, progress: 91, difficulty: "Medium", accent: "sky" },
  { id: "responsibility", value: "Responsibility", blurb: "Owning your choices and promises", completed: 4, total: 9, progress: 45, difficulty: "Growing", accent: "grape" },
  { id: "fairness", value: "Fairness", blurb: "Sharing and treating everyone equally", completed: 0, total: 8, progress: 0, difficulty: "Easy", accent: "leaf" },
];

export const weeklyTrend = [
  { week: "Wk 1", score: 61, scenarios: 2 },
  { week: "Wk 2", score: 66, scenarios: 3 },
  { week: "Wk 3", score: 70, scenarios: 4 },
  { week: "Wk 4", score: 74, scenarios: 3 },
  { week: "Wk 5", score: 79, scenarios: 4 },
  { week: "Wk 6", score: 82, scenarios: 2 },
];

export const recentScenarios = [
  { name: "The Lost Wallet", value: "Honesty", score: 90, date: "Today" },
  { name: "The Lunch Box", value: "Empathy", score: 70, date: "Yesterday" },
  { name: "The Group Project", value: "Responsibility", score: 60, date: "Monday" },
  { name: "The New Student", value: "Kindness", score: 84, date: "Sunday" },
  { name: "Library Voices", value: "Respect", score: 92, date: "Saturday" },
];

export const badges = [
  { id: "honesty-explorer", name: "Honesty Explorer", emoji: "🏆", desc: "Completed 8 honesty scenarios", unlocked: false, tint: "sun" },
  { id: "empathy-champion", name: "Empathy Champion", emoji: "❤️", desc: "Chose the caring path 10 times", unlocked: true, tint: "coral" },
  { id: "kindness-builder", name: "Kindness Builder", emoji: "🤝", desc: "Helped in 6 kindness stories", unlocked: true, tint: "primary" },
  { id: "trust-keeper", name: "Trust Keeper", emoji: "🛡️", desc: "Built the trust bridge 5 times", unlocked: true, tint: "sky" },
  { id: "growth-mindset", name: "Growth Mindset", emoji: "🌱", desc: "Tried again after a tricky choice", unlocked: true, tint: "leaf" },
  { id: "reflection-star", name: "Reflection Star", emoji: "✨", desc: "Answered 20 reflection questions", unlocked: false, tint: "grape" },
  { id: "fairness-friend", name: "Fairness Friend", emoji: "⚖️", desc: "Unlocks with the Fairness chapter", unlocked: false, tint: "primary" },
  { id: "streak-hero", name: "Streak Hero", emoji: "🔥", desc: "Learn 14 days in a row", unlocked: false, tint: "coral" },
];

export const recommendations = [
  { title: "The Lunch Box", value: "Empathy", difficulty: "Easy", why: "Builds on your last empathy reflection", emoji: "🥪" },
  { title: "The Forgotten Homework", value: "Responsibility", difficulty: "Medium", why: "Recommended to strengthen Responsibility", emoji: "📒" },
  { title: "Kindness Challenge", value: "Kindness", difficulty: "Weekly", why: "Complete 3 kindness scenarios this week", emoji: "🌼" },
];

export const parentInsights = [
  "Arjun is showing strong progress in Honesty and Respect.",
  "Responsibility-based scenarios have been more challenging recently.",
  "Sophron recommends 3 additional Responsibility scenarios this week.",
];

export const conversation = [
  { from: "child", text: "Why was my first answer not a good choice?" },
  {
    from: "sophron",
    text: "Let's think about it together. Imagine you were the person who lost the wallet. How would you feel?",
  },
  { from: "child", text: "I think I would feel worried." },
  {
    from: "sophron",
    text: "That makes sense. When we notice that feeling in someone else, it helps us choose the path that keeps them safe.",
  },
];
