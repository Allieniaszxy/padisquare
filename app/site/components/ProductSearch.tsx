"use client";

interface ProductSearchProps {
  onSearch: (query: string) => void;
}

export default function ProductSearch({ onSearch }: ProductSearchProps) {
  return (
    <input
      type="text"
      placeholder="Search products..."
      className="border p-2 rounded w-full mb-4"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
