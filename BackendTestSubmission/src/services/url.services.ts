import { urlDB, URLRecord } from "../db";
import { nanoid } from "nanoid";

export function generateShortCode(): string {
  let code = nanoid(6);
  while (urlDB.has(code)) {
    code = nanoid(6);
  }
  return code;
}

export function createShortURL(originalUrl: string, shortcode?: string, validityMinutes?: number): URLRecord {
  const now = new Date();
  const expiry = new Date(now.getTime() + (validityMinutes ?? 30) * 60 * 1000);

  const shortCode = shortcode || generateShortCode();

  if (urlDB.has(shortCode)) {
    throw new Error("Shortcode already exists");
  }

  const record: URLRecord = {
    originalUrl,
    shortCode,
    expiry,
    createdAt: now,
    clickCount: 0
  };

  urlDB.set(shortCode, record);
  return record;
}

export function getURLRecord(code: string): URLRecord | undefined {
  return urlDB.get(code);
}
