import { toast } from "react-toastify";

export function notify(message, type) {
  toast[type](message);
}

export const API_URL = "http://localhost:8080";
