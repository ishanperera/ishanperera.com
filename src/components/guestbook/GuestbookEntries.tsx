"use client";

import { useEffect, useState, useCallback } from "react";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatDate } from "@/lib/utils";
import { GuestbookForm } from "./GuestbookForm";

interface GuestbookEntry {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

export function GuestbookEntries() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = useCallback(async () => {
    try {
      const res = await fetch("/api/guestbook");
      const data = await res.json();
      setEntries(data);
    } catch {
      // Silently fail — empty guestbook is fine
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  return (
    <div className="space-y-12">
      <Card hover={false}>
        <h3 className="font-display text-lg font-bold text-text-primary mb-4">
          Sign the Guestbook
        </h3>
        <GuestbookForm onSuccess={fetchEntries} />
      </Card>

      <div>
        <h3 className="font-display text-lg font-bold text-text-primary mb-6">
          Messages ({loading ? "..." : entries.length})
        </h3>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
        ) : entries.length === 0 ? (
          <Card hover={false}>
            <p className="text-text-muted text-center py-4">
              No messages yet. Be the first to sign!
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <Card key={entry.id} hover={false}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display font-semibold text-text-primary">
                      {entry.name}
                    </p>
                    <p className="text-sm text-text-secondary mt-1">
                      {entry.message}
                    </p>
                  </div>
                  <span className="text-xs text-text-muted whitespace-nowrap">
                    {formatDate(entry.created_at)}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
