"use client";

import { useToast } from "@/components/ui/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-0 right-0 z-50 flex flex-col gap-2 p-4 max-w-md">
      {toasts.map(({ id, title, description, variant }) => (
        <div
          key={id}
          className={`p-4 rounded-md shadow-md transition-all ${
            variant === "destructive"
              ? "bg-red-500 text-white"
              : "bg-white text-gray-800"
          }`}
        >
          {title && <div className="font-semibold">{title}</div>}
          {description && <div className="text-sm mt-1">{description}</div>}
        </div>
      ))}
    </div>
  );
}
