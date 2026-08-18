export function formatDuration(minutes: number) {
  return `${minutes} MIN`;
}

export function formatTime(isoOrTime: string) {
  if (/^\d{2}:\d{2}$/.test(isoOrTime)) return isoOrTime;
  const date = new Date(isoOrTime);
  if (Number.isNaN(date.getTime())) return isoOrTime;
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function formatDateRange(startsAt: string, endsAt: string) {
  const start = new Date(startsAt);
  const end = new Date(endsAt);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return `${startsAt} – ${endsAt}`;
  }
  const date = start.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return `${date} · ${formatTime(startsAt)}–${formatTime(endsAt)}`;
}

export function formatPrice(cents: number | null, currency = "EUR") {
  if (cents === null) return "Price on request";
  return new Intl.NumberFormat("en-CY", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(cents / 100);
}

export function timeRemaining(endsAt: string) {
  const end = new Date(endsAt).getTime();
  const now = Date.now();
  const diff = end - now;
  if (diff <= 0) return "Closed";
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  if (days > 0) return `${days}d ${hours}h remaining`;
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  return `${hours}h ${minutes}m remaining`;
}

export function dayKey(iso: string) {
  const date = new Date(iso);
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;
  return days[date.getDay()];
}
