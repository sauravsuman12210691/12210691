import { Router } from "express";
import { shortenURL, getURLStats, redirectURL } from "../controllers/url.controller";

const router = Router();

router.post("/shorturls", shortenURL);
router.get("/shorturls/:shortcode", getURLStats);
router.get("/:shortcode", redirectURL);

export default router;
