import { useRef } from "react";

const MIN_FILL_TIME_MS = 3000;

export function useSpamGuard() {
  const startedAt = useRef(Date.now());
  const trapRef = useRef(null);

  const check = () => {
    if (trapRef.current?.value) return "bot";
    if (Date.now() - startedAt.current < MIN_FILL_TIME_MS) return "too-fast";
    return "ok";
  };

  const trapValue = () => trapRef.current?.value || "";

  return { trapRef, check, trapValue };
}
