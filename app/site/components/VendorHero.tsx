"use client";

import { useState, useMemo } from "react";
import VendorHero from "./components/VendorHero";
import ProductGrid from "./components/ProductGrid";
import ProductSearch from "./components/ProductSearch";
import SortDropdown from "./components/SortDropdown";
import Pagination from "./components/Pagination";
import DarkModeToggle from "./components/DarkModeToggle";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface VendorPageProps {
  vendor: { name: string; logo: string };
  products: Product[];
}

export default function VendorPage({ vendor, products }: VendorPageProps) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 8;

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase()),
    );
    if (sort === "price-asc") result = result.sort((a, b) => a.price - b.price);
    if (sort === "price-desc")
      result = result.sort((a, b) => b.price - a.price);
    return result;
  }, [products, search, sort]);

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredProducts.slice(start, start + perPage);
  }, [filteredProducts, page]);

  const totalPages = Math.ceil(filteredProducts.length / perPage);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <VendorHero name={vendor.name} logo={vendor.logo} />
        <DarkModeToggle />
      </div>

      <ProductSearch onSearch={setSearch} />
      <SortDropdown onSortChange={setSort} />

      <ProductGrid products={paginatedProducts} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
