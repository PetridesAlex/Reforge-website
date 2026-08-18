export const INTRO_KEY = "reforge-intro";
export const CONSENT_KEY = "reforge-cookie-consent";
export const READY_EVENT = "reforge-ready";

export type CookieConsent = "accepted" | "essential";

export function readConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(CONSENT_KEY);
  return value === "accepted" || value === "essential" ? value : null;
}

export function writeConsent(value: CookieConsent) {
  window.localStorage.setItem(CONSENT_KEY, value);
  window.dispatchEvent(new Event("reforge-consent"));
}

export function introSeen() {
  if (typeof window === "undefined") return true;
  return window.sessionStorage.getItem(INTRO_KEY) === "1";
}

export function markIntroSeen() {
  window.sessionStorage.setItem(INTRO_KEY, "1");
  document.documentElement.removeAttribute("data-reforge-booting");
  document.body.style.removeProperty("overflow");
  document.documentElement.style.removeProperty("overflow");
  window.dispatchEvent(new Event(READY_EVENT));
}
