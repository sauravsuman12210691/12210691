import { Request, Response } from "express";
import { createShortURL, getURLRecord } from "../services/url.services";
import { Log } from "../utils/logger";

export async function shortenURL(req: Request, res: Response) {
  try {
    //fetching from front end
    const { url, validity, shortcode } = req.body;
    const record = createShortURL(url, shortcode, validity);

    await Log("backend", "info", "controller", `Created short URL: ${record.shortCode}`);

    return res.status(201).json({
      shortLink: `${req.protocol}://${req.get("host")}/${record.shortCode}`,
      expiry: record.expiry.toISOString()
    });
  } catch (err: any) {
    await Log("backend", "error", "controller", `Failed to shorten URL: ${err.message}`);
    return res.status(400).json({ error: err.message });
  }
}

// acessing url from shorten
export async function redirectURL(req: Request, res: Response) {
  const { shortcode } = req.params;
  const record = getURLRecord(shortcode);

  if (!record) {
    await Log("backend", "warn", "handler", `Shortcode not found: ${shortcode}`);
    return res.status(404).json({ error: "Short URL not found" });
  }

  const now = new Date();
  if (now > record.expiry) {
    await Log("backend", "info", "handler", `Short URL expired: ${shortcode}`);
    return res.status(410).json({ error: "Link expired" });
  }

  record.clickCount++;
  await Log("backend", "info", "handler", `Redirecting for shortcode: ${shortcode}`);
  return res.redirect(record.originalUrl);
}

export async function getURLStats(req: Request, res: Response) {
  const { shortcode } = req.params;
  const record = getURLRecord(shortcode);

  if (!record) {
    await Log("backend", "warn", "controller", `Stats request for invalid shortcode: ${shortcode}`);
    return res.status(404).json({ error: "Short URL not found" });
  }

  return res.json({
    shortLink: `${req.protocol}://${req.get("host")}/${record.shortCode}`,
    expiry: record.expiry.toISOString(),
    clicks: record.clickCount,
    originalUrl: record.originalUrl,
    creationDate: record.createdAt.toISOString()
  });
}
