export type Stack = "frontend" | "backend";
export type Level = "debug" | "info" | "warn" | "error" | "fatal";

export type BackendPackage =
  | "cache"
  | "controller"
  | "cron_job"
  | "db"
  | "domain"
  | "handler"
  | "repository"
  | "route"
  | "service";

export type FrontendPackage = "api";

export type Package = BackendPackage | FrontendPackage;

export interface LogPayload {
  stack: Stack;
  level: Level;
  package: Package;
  message: string;
}
