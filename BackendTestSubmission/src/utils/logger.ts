import axios from "axios";
import dotenv from "dotenv";
dotenv.config();


// ----------------- Types ------------------
type Stack = "backend" | "frontend";
type Level = "debug" | "info" | "warn" | "error" | "fatal";

type BackendPackage =
  | "cache"
  | "controller"
  | "cron_job"
  | "db"
  | "domain"
  | "handler"
  | "repository"
  | "route"
  | "service";

type Package = BackendPackage;

interface LogPayload {
  stack: Stack;
  level: Level;
  package: Package;
  message: string;
}

// ----------------- Constants ------------------
const LOG_API_URL = "http://20.244.56.144/evaluation-service/logs";

// ----------------- Main Function ------------------
export async function Log(
  stack: Stack,
  level: Level,
  pkg: Package,
  message: string
): Promise<void> {
  const payload: LogPayload = { stack, level, package: pkg, message };

  try {
    const res = await axios.post(LOG_API_URL, payload);
    console.log(`[Log] ${level.toUpperCase()} - ${pkg}: ${message}`);
  } catch (err: any) {
    console.error(`[Log] Failed to log: ${message} →`, err.message);
  }
}
