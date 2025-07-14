import React, { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import ShortenForm from "./components/ShortenForm";
import StatsCard from "./components/StatsCard";

function App() {
  const [stats, setStats] = useState(null);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          🔗 URL Shortener
        </Typography>
        <ShortenForm onStatsFetched={setStats} />
        {stats && <StatsCard stats={stats} />}
      </Box>
    </Container>
  );
}

export default App;
