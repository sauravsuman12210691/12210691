import axios from "axios";

const LOGGING_URL = "http://20.244.56.144/evaluation-service/logs";

export async function Log(
  stack: "frontend",
  level: "info" | "warn" | "debug" | "error" | "fatal",
  pkg: "api",
  message: string
) {
  try {
    const res = await axios.post(LOGGING_URL, {
      stack,
      level,
      package: pkg,
      message,
    });
    return res.data;
  } catch (err) {
    console.error("Logging failed:", err);
  }
}
