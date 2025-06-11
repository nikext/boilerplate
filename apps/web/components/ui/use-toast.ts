// Copied from https://ui.shadcn.com/docs/components/toast
import { useState, useEffect, useCallback } from "react";

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 1000000;

type ToastActionElement = React.ReactElement;

export type Toast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: "default" | "destructive";
};

let count = 0;

function generateId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

type ToasterToast = Toast & {
  dismiss: () => void;
};

const toasts: ToasterToast[] = [];

type ToastProps = Omit<Toast, "id">;

function toast({ ...props }: ToastProps) {
  const id = generateId();

  const update = (props: ToastProps) => {
    toasts.forEach((t) => {
      if (t.id === id) {
        t.title = props.title;
        t.description = props.description;
        t.action = props.action;
        t.variant = props.variant;
      }
    });
  };

  const dismiss = () => {
    toasts.forEach((t) => {
      if (t.id === id) {
        t.dismiss();
      }
    });
  };

  return {
    id,
    dismiss,
    update,
  };
}

function useToast() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return {
    toast,
    dismiss: (id: string) => {
      toasts.forEach((t) => {
        if (t.id === id) {
          t.dismiss();
        }
      });
    },
    toasts: mounted ? toasts : [],
  };
}

export { useToast, toast };
