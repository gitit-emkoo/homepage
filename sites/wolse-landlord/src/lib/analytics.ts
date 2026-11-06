export type TrackParams = Record<string, string | number | undefined>;

type Gtag = (...args: unknown[]) => void;
type Fbq = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    fbq?: Fbq;
  }
}

export function track(name: string, params: TrackParams = {}) {
  if (typeof window === "undefined") return;
  const clean = Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined));
  window.gtag?.("event", name, clean);
  if (name === "form_submit") window.fbq?.("track", "Lead", clean);
}

export function trackCta(location: string) {
  track("cta_click", { location });
}
