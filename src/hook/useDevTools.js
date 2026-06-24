import { useEffect } from "react";

const useDevTools = (enabled) => {
  useEffect(() => {
    if (!enabled) return;

    // Disable right click
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    // Disable DevTools keys
    const handleKeyDown = (e) => {
      // F12
      if (e.key === "F12") {
        e.preventDefault();
        return;
      }

      // Ctrl+Shift+I/J/C
      if (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) {
        e.preventDefault();
        return;
      }

      // Ctrl+U
      if (e.ctrlKey && (e.key === "u" || e.key === "U")) {
        e.preventDefault();
        return;
      }

      // Ctrl+C (copy)
      if (e.ctrlKey && (e.key === "c" || e.key === "C")) {
        e.preventDefault();
        return;
      }

      // Ctrl+V (paste)
      if (e.ctrlKey && (e.key === "v" || e.key === "V")) {
        e.preventDefault();
        return;
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled]);
};

export default useDevTools;
