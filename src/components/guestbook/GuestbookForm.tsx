"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";

interface GuestbookFormProps {
  onSuccess: () => void;
}

export function GuestbookForm({ onSuccess }: GuestbookFormProps) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const message = formData.get("message") as string;

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Something went wrong.");
        return;
      }

      toast.success("Thanks for signing the guestbook!");
      e.currentTarget.reset();
      onSuccess();
    } catch {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          name="name"
          type="text"
          required
          maxLength={50}
          placeholder="Your name"
          className="w-full rounded-lg border border-border bg-bg-tertiary px-4 py-2.5 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-accent-primary transition-colors"
        />
      </div>
      <div>
        <textarea
          name="message"
          required
          maxLength={500}
          rows={3}
          placeholder="Leave a message..."
          className="w-full rounded-lg border border-border bg-bg-tertiary px-4 py-2.5 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-accent-primary transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-lg bg-accent-primary px-5 py-2.5 font-display font-semibold text-sm text-bg-primary transition-all hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] disabled:opacity-50"
      >
        <Send size={14} />
        {loading ? "Signing..." : "Sign Guestbook"}
      </button>
    </form>
  );
}
