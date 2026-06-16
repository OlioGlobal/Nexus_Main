const STORAGE_KEY = "nexus_tracking";
const JOURNEY_KEY = "nexus_journey";

interface TrackingData {
  landingPage?: string;
  source?: string;
  medium?: string;
  campaign?: string;
  referrer?: string;
  journey?: string;
}

function detectSource(referrer: string): string {
  if (!referrer) return "direct";

  try {
    const domain = new URL(referrer).hostname.replace("www.", "");

    if (domain.includes("google")) return "google";
    if (domain.includes("bing")) return "bing";
    if (domain.includes("yahoo")) return "yahoo";
    if (domain.includes("facebook") || domain.includes("fb.com"))
      return "facebook";
    if (domain.includes("instagram")) return "instagram";
    if (domain.includes("linkedin")) return "linkedin";
    if (domain.includes("twitter") || domain.includes("t.co"))
      return "twitter";
    if (domain.includes("youtube")) return "youtube";
    if (domain.includes("whatsapp")) return "whatsapp";

    return domain;
  } catch {
    return "direct";
  }
}

function detectMedium(
  referrer: string,
  utmMedium: string | null
): string {
  if (utmMedium) return utmMedium;

  if (!referrer) return "direct";

  try {
    const domain = new URL(referrer).hostname;

    if (
      domain.includes("google") ||
      domain.includes("bing") ||
      domain.includes("yahoo")
    ) {
      return "organic";
    }

    return "referral";
  } catch {
    return "direct";
  }
}

export function initTracker(): void {
  if (typeof window === "undefined") return;

  if (sessionStorage.getItem(STORAGE_KEY)) return;

  const params = new URLSearchParams(window.location.search);
  const referrer = document.referrer || "";

  const trackingData = {
    landingPage: window.location.href,
    source: params.get("utm_source") || detectSource(referrer),
    medium: detectMedium(referrer, params.get("utm_medium")),
    campaign: params.get("utm_campaign") || "",
    referrer,
  };

  sessionStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(trackingData)
  );
}

export function recordPage(path: string): void {
  if (typeof window === "undefined") return;

  try {
    const journey: string[] = JSON.parse(
      sessionStorage.getItem(JOURNEY_KEY) || "[]"
    );

    if (journey[journey.length - 1] !== path) {
      journey.push(path);

      sessionStorage.setItem(
        JOURNEY_KEY,
        JSON.stringify(journey)
      );
    }
  } catch {}
}

export function getTracking(): TrackingData {
  if (typeof window === "undefined") return {};

  try {
    const tracking = JSON.parse(
      sessionStorage.getItem(STORAGE_KEY) || "{}"
    );

    const journey: string[] = JSON.parse(
      sessionStorage.getItem(JOURNEY_KEY) || "[]"
    );

    return {
      ...tracking,
      journey: journey.join(" → "),
    };
  } catch {
    return {};
  }
}