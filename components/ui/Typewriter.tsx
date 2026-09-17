"use client";

import { useEffect, useRef, useState } from "react";

export function Typewriter({
  lines,
  className = "",
  onComplete,
}: {
  lines: string[];
  className?: string;
  onComplete?: () => void;
}) {
  const full = lines.join("\n");
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setText(full);
      setDone(true);
      onCompleteRef.current?.();
      return;
    }

    setText("");
    setDone(false);
    let index = 0;
    let timer = 0;

    const type = () => {
      if (index >= full.length) {
        setDone(true);
        onCompleteRef.current?.();
        return;
      }
      const char = full[index];
      index += 1;
      setText(full.slice(0, index));
      timer = window.setTimeout(type, char === "\n" ? 340 : 48);
    };

    timer = window.setTimeout(type, 480);
    return () => window.clearTimeout(timer);
  }, [full]);

  return (
    <span className={className}>
      {text.split("\n").map((line, index, parts) => (
        <span key={index}>
          {line}
          {index < parts.length - 1 ? <br /> : null}
        </span>
      ))}
      <span
        aria-hidden
        className={`type-cursor ${done ? "type-cursor-done" : ""}`}
      />
    </span>
  );
}
