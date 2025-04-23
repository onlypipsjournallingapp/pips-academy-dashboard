
import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const bellRef = useRef<HTMLButtonElement>(null);
  const isMobile = useIsMobile();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!bellRef.current?.contains(e.target as Node)) setOpen(false);
    }
    if (open) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="relative">
      <button
        ref={bellRef}
        className="relative p-2 rounded-full transition bg-transparent hover:bg-primary/10 text-primary focus:bg-primary/20"
        onClick={() => setOpen((v) => !v)}
        aria-label="Notifications"
        type="button"
      >
        {/* Animate bell ring */}
        <Bell className={cn("h-6 w-6", open && "animate-bounce")} />
        {/* Dot for unread (always visible for demo) */}
        <span className="absolute top-1 right-1 inline-flex h-2 w-2 rounded-full bg-primary"></span>
      </button>
      {open && (
        <div 
          className={cn(
            "absolute mt-2 w-64 bg-popover shadow-xl rounded-lg border z-50",
            isMobile ? "left-0 -translate-x-1/4" : "right-0"
          )}
        >
          <div className="p-4 text-sm text-muted-foreground text-center">
            <span className="font-semibold">No notifications yet.</span>
            <p className="mt-1">Stay tuned for trading tips and updates.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
