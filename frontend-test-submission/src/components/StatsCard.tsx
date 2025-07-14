import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface Props {
  stats: {
    shortLink: string;
    expiry: string;
    clicks: number;
    originalUrl: string;
    creationDate: string;
  };
}

const StatsCard: React.FC<Props> = ({ stats }) => {
  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h6">🔗 Shortened URL:</Typography>
        <a href={stats.shortLink} target="_blank" rel="noopener noreferrer">{stats.shortLink}</a>

        <Typography variant="body2" mt={2}>📅 Created At: {new Date(stats.creationDate).toLocaleString()}</Typography>
        <Typography variant="body2">⏳ Expiry: {new Date(stats.expiry).toLocaleString()}</Typography>
        <Typography variant="body2">👀 Clicks: {stats.clicks}</Typography>
        <Typography variant="body2">🌐 Original URL: {stats.originalUrl}</Typography>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
