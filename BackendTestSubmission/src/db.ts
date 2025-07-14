export interface URLRecord {
  originalUrl: string;
  shortCode: string;
  expiry: Date;
  createdAt: Date;
  clickCount: number;
}

export const urlDB = new Map<string, URLRecord>();
