"use client";

interface SortDropdownProps {
  onSortChange: (value: string) => void;
}

export default function SortDropdown({ onSortChange }: SortDropdownProps) {
  return (
    <select
      className="border p-2 rounded mb-4"
      onChange={(e) => onSortChange(e.target.value)}
    >
      <option value="">Sort by</option>
      <option value="price-asc">Price: Low → High</option>
      <option value="price-desc">Price: High → Low</option>
      <option value="recent">Most Recent</option>
    </select>
  );
}
