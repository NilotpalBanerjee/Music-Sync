import { useEffect } from "react";

export default function GlobalInputSanitizer() {
  useEffect(() => {
    const handler = (e) => {
      if (
        e.target.tagName === "INPUT" ||
        e.target.tagName === "TEXTAREA"
      ) {
        let value = e.target.value;

        // Remove pipe |
        value = value.replaceAll("|", "");

        // Remove leading space
        value = value.replace(/^\s+/, "");

        // Allow only single spaces between words
        value = value.replace(/\s{2,}/g, " ");

        if (value !== e.target.value) {
          e.target.value = value;
          e.target.dispatchEvent(new Event("input", { bubbles: true }));
        }
      }
    };

    document.addEventListener("input", handler);
    return () => document.removeEventListener("input", handler);
  }, []);

  return null;
}
