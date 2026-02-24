"use client";

import { useState, useMemo } from "react";
import { publications, type PublicationCategory } from "@/data/publications";
import { SearchFilter } from "./SearchFilter";
import { PublicationCard } from "./PublicationCard";

export function PublicationList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<PublicationCategory | "All">("All");

  const filtered = useMemo(() => {
    return publications.filter((pub) => {
      const matchesFilter =
        activeFilter === "All" || pub.tags.includes(activeFilter);
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        pub.title.toLowerCase().includes(query) ||
        pub.authors.toLowerCase().includes(query) ||
        pub.tags.some((tag) => tag.toLowerCase().includes(query));
      return matchesFilter && matchesSearch;
    });
  }, [searchQuery, activeFilter]);

  return (
    <div>
      <SearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <div className="rounded-xl border border-border bg-bg-secondary p-6">
        {filtered.length > 0 ? (
          filtered.map((pub) => (
            <PublicationCard key={pub.title} publication={pub} />
          ))
        ) : (
          <p className="text-center text-text-muted py-8">
            No publications match your search.
          </p>
        )}
      </div>

      <p className="mt-4 text-sm text-text-muted text-center">
        Showing {filtered.length} of {publications.length} publications
      </p>
    </div>
  );
}
