import { toast } from "react-toastify";

/**
 * Displays a toast notification with the given message and type.
 * 
 * @param {string} message - The message to display in the toast.
 * @param {"success" | "error"} type - The type of toast notification.
 */
export function showToast(message: string, type: "success" | "error") {
  if (type === "success") {
    // Show a success notification
    toast.success(message);
  } else {
    // Show an error notification
    toast.error(message);
  }
}
