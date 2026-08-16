export type ChildSession = {
  childId: string;
  childCode: string;
  parentCode: string;
  name: string;
  age: number | null;
  avatar: string;
};

const KEY = "sophron.child-session";

export function getChildSession(): ChildSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ChildSession) : null;
  } catch {
    return null;
  }
}

export function setChildSession(session: ChildSession) {
  window.localStorage.setItem(KEY, JSON.stringify(session));
}

export function clearChildSession() {
  window.localStorage.removeItem(KEY);
}
