import { sendLog } from "./logClient";
import { Stack, Level, Package } from "./types";

export async function Log(
  stack: Stack,
  level: Level,
  pkg: Package,
  message: string
) {
    //returning logs
  return await sendLog({ stack, level, package: pkg, message });
}
