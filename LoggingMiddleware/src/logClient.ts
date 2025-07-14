import axios from "axios";
import { LOG_API_URL } from "./constants";
import { LogPayload } from "./types";

export async function sendLog(payload: LogPayload) {
  try {
    //ali call
    const response = await axios.post(LOG_API_URL, payload);
    return response.data;
  } catch (error: any) {
    console.error("Logging failed:", error.message);
    return null;
  }
}
