"use client";
import { useEffect, useState } from "react";

export default function Timer({ duration, onExpire }: any) {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    if (time <= 0) {
      onExpire();
      return;
    }

    const t = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(t);
  }, [time]);

  return (
    <div style={{ fontWeight: "bold", marginBottom: "20px" }}>
      ⏱️ {Math.floor(time / 60)}:{time % 60}
    </div>
  );
}