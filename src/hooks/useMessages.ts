"use client";

import { useState } from "react";

interface MessagePayload {
  name: string;
  email: string;
  message: string;
}

export function useMessages() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (data: MessagePayload) => {
    if (!data.name || !data.message) return;
    
    setSending(true);
    setError(null);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Failed to send");

      setSent(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal mengirim pesan";
      setError(msg);
      console.error("Message send failed:", err);
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setSent(false);
    setError(null);
  };

  return { sendMessage, sending, sent, error, reset };
}
