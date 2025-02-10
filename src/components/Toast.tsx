import { toast } from "react-toastify";

export function showToast(message: string, type: "success" | "error") {
  if (type === "success") {
    toast.success(message); // Show success toast notification
  } else {
    toast.error(message); // Show error toast notification
  }
}
