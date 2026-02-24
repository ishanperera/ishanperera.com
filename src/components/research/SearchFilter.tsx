"use client";

import { Search } from "lucide-react";
import { allCategories, type PublicationCategory } from "@/data/publications";
import { cn } from "@/lib/utils";

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: PublicationCategory | "All";
  onFilterChange: (filter: PublicationCategory | "All") => void;
}

export function SearchFilter({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
}: SearchFilterProps) {
  const filters: (PublicationCategory | "All")[] = ["All", ...allCategories];

  return (
    <div className="space-y-4 mb-8">
      {/* Search bar */}
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
          size={16}
        />
        <input
          type="text"
          placeholder="Search by title, authors, or tags..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-border bg-bg-secondary py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
        />
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-mono transition-colors",
              activeFilter === filter
                ? "bg-accent-primary text-bg-primary"
                : "bg-bg-tertiary text-text-secondary hover:text-text-primary"
            )}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
