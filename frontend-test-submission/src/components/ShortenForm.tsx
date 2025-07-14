import React, { useState } from "react";
import { TextField, Button, Box, Divider, Typography } from "@mui/material";
import api from "../api/axios";
import { Log } from "../utils/logger";

interface Props {
  onStatsFetched: (data: any) => void;
}

const ShortenForm: React.FC<Props> = ({ onStatsFetched }) => {
  const [url, setUrl] = useState("");
  const [validity, setValidity] = useState("");
  const [shortcode, setShortcode] = useState("");
  const [fetchCode, setFetchCode] = useState("");

  const handleShorten = async () => {
    try {
      const res = await api.post("/shorturls", {
        url,
        validity: validity ? parseInt(validity) : undefined,
        shortcode: shortcode || undefined,
      });

      await Log("frontend", "info", "api", `Shortened URL created: ${res.data.shortLink}`);

      const shortCode = res.data.shortLink.split("/").pop();
      const statsRes = await api.get(`/shorturls/${shortCode}`);
      onStatsFetched(statsRes.data);
    } catch (err: any) {
      await Log("frontend", "error", "api", `Failed to shorten URL: ${err.message}`);
      alert("Failed to shorten URL");
    }
  };

  const handleFetch = async () => {
    try {
      const statsRes = await api.get(`/shorturls/${fetchCode}`);
      await Log("frontend", "info", "api", `Fetched stats for: ${fetchCode}`);
      onStatsFetched(statsRes.data);
    } catch (err: any) {
      await Log("frontend", "warn", "api", `Invalid fetch attempt: ${fetchCode}`);
      alert("Failed to fetch stats. Invalid shortcode?");
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Box>
        <Typography variant="h6">🔗 Shorten a New URL</Typography>
        <TextField label="Long URL" value={url} onChange={(e) => setUrl(e.target.value)} fullWidth margin="dense" />
        <TextField label="Validity (minutes)" value={validity} onChange={(e) => setValidity(e.target.value)} fullWidth margin="dense" />
        <TextField label="Custom Shortcode (optional)" value={shortcode} onChange={(e) => setShortcode(e.target.value)} fullWidth margin="dense" />
        <Button variant="contained" fullWidth sx={{ mt: 1 }} onClick={handleShorten}>Shorten</Button>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box>
        <Typography variant="h6">📊 Fetch Stats by Shortcode</Typography>
        <TextField label="Shortcode" value={fetchCode} onChange={(e) => setFetchCode(e.target.value)} fullWidth margin="dense" />
        <Button variant="outlined" fullWidth sx={{ mt: 1 }} onClick={handleFetch}>Fetch Stats</Button>
      </Box>
    </Box>
  );
};

export default ShortenForm;
