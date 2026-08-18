import type { DayKey } from "@/types";

export const STUDIO_TIME_ZONE = "Europe/Nicosia";

const WEEKDAY_TO_KEY: Record<string, DayKey> = {
  Mon: "MON",
  Monday: "MON",
  Tue: "TUE",
  Tuesday: "TUE",
  Wed: "WED",
  Wednesday: "WED",
  Thu: "THU",
  Thursday: "THU",
  Fri: "FRI",
  Friday: "FRI",
  Sat: "SAT",
  Saturday: "SAT",
  Sun: "SUN",
  Sunday: "SUN",
};

const DAY_KEYS: DayKey[] = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const DAY_LONG: Record<DayKey, string> = {
  MON: "Monday",
  TUE: "Tuesday",
  WED: "Wednesday",
  THU: "Thursday",
  FRI: "Friday",
  SAT: "Saturday",
  SUN: "Sunday",
};
const DAY_SHORT: Record<DayKey, string> = {
  MON: "Mon",
  TUE: "Tue",
  WED: "Wed",
  THU: "Thu",
  FRI: "Fri",
  SAT: "Sat",
  SUN: "Sun",
};

export type StudioWeekDay = {
  key: DayKey;
  year: number;
  month: number;
  day: number;
  dateKey: string;
  isToday: boolean;
  isPast: boolean;
  short: string;
  long: string;
  monthShort: string;
  monthLong: string;
};

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function toDateKey(year: number, month: number, day: number) {
  return `${year}-${pad(month)}-${pad(day)}`;
}

export function getStudioParts(date: Date = new Date()) {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: STUDIO_TIME_ZONE,
    weekday: "short",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  const parts: Record<string, string> = {};
  for (const part of fmt.formatToParts(date)) {
    if (part.type !== "literal") parts[part.type] = part.value;
  }
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(parts.hour),
    minute: Number(parts.minute),
    second: Number(parts.second),
    weekday: parts.weekday,
  };
}

export function studioDateKey(isoOrDate: string | Date) {
  const date = typeof isoOrDate === "string" ? new Date(isoOrDate) : isoOrDate;
  const parts = getStudioParts(date);
  return toDateKey(parts.year, parts.month, parts.day);
}

export function studioDayKey(isoOrDate: string | Date): DayKey {
  const date = typeof isoOrDate === "string" ? new Date(isoOrDate) : isoOrDate;
  const weekday = getStudioParts(date).weekday;
  return WEEKDAY_TO_KEY[weekday] ?? "MON";
}

export function addCivilDays(
  parts: { year: number; month: number; day: number },
  days: number,
) {
  const utc = new Date(Date.UTC(parts.year, parts.month - 1, parts.day + days));
  return {
    year: utc.getUTCFullYear(),
    month: utc.getUTCMonth() + 1,
    day: utc.getUTCDate(),
  };
}

export function fromStudioLocal(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute = 0,
) {
  const desired = Date.UTC(year, month - 1, day, hour, minute, 0);
  let guess = desired;
  for (let i = 0; i < 4; i += 1) {
    const parts = getStudioParts(new Date(guess));
    const asUtc = Date.UTC(
      parts.year,
      parts.month - 1,
      parts.day,
      parts.hour,
      parts.minute,
      parts.second,
    );
    const diff = desired - asUtc;
    if (Math.abs(diff) < 500) break;
    guess += diff;
  }
  return new Date(guess);
}

export function studioWeek(now = new Date()): StudioWeekDay[] {
  const today = getStudioParts(now);
  const todayKey = toDateKey(today.year, today.month, today.day);
  const offset = DAY_KEYS.indexOf(WEEKDAY_TO_KEY[today.weekday] ?? "MON");
  const monday = addCivilDays(today, -offset);

  return DAY_KEYS.map((key, i) => {
    const civil = addCivilDays(monday, i);
    const dateKey = toDateKey(civil.year, civil.month, civil.day);
    const monthDate = new Date(Date.UTC(civil.year, civil.month - 1, civil.day));
    return {
      key,
      year: civil.year,
      month: civil.month,
      day: civil.day,
      dateKey,
      isToday: dateKey === todayKey,
      isPast: dateKey < todayKey,
      short: DAY_SHORT[key],
      long: DAY_LONG[key],
      monthShort: monthDate.toLocaleString("en-GB", { month: "short", timeZone: "UTC" }),
      monthLong: monthDate.toLocaleString("en-GB", { month: "long", timeZone: "UTC" }),
    };
  });
}

export function formatStudioWeekRange(week: StudioWeekDay[]) {
  const start = week[0];
  const end = week[6];
  if (start.month === end.month) {
    return `${start.day}–${end.day} ${start.monthShort} ${start.year}`;
  }
  return `${start.day} ${start.monthShort} – ${end.day} ${end.monthShort} ${end.year}`;
}
