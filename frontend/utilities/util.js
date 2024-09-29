import { toast } from "react-toastify";

export function notify(message, type) {
  toast[type](message);
}

export const API_URL = "https://mern-practice-task-manager-api.vercel.app";
