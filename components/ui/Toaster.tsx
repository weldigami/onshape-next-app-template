import { useToast } from "@/components/ui/use-toast";
export function Toaster() {
  const { toasts } = useToast();
  return (
    <div>
      {toasts.map((toast, i) => (
        <div key={i}>{toast.title}: {toast.description}</div>
      ))}
    </div>
  );
}