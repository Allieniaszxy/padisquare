import { getVendor, getProducts } from "./utils/api";
import VendorHero from "./components/VendorHero";
import ProductGrid from "./components/ProductGrid";
import ProductSearch from "./components/ProductSearch";
import SortDropdown from "./components/SortDropdown";
import Pagination from "./components/Pagination";
import DarkModeToggle from "./components/DarkModeToggle";
import { useState, useEffect } from "react";
import { Product, Vendor } from "./utils/types";

interface VendorPageProps {
  params: { vendorSlug: string };
}

export default async function VendorPage({ params }: VendorPageProps) {
  const vendor: Vendor | null = await getVendor(params.vendorSlug);
  if (!vendor) return <p>Vendor not found</p>;

  // Fetch all products once (Server Component)
  const initialProducts: Product[] = await getProducts(params.vendorSlug);

  return <VendorPageClient vendor={vendor} initialProducts={initialProducts} />;
}

/**
 * Client Component handles:
 * - search
 * - sorting
 * - pagination
 */
function VendorPageClient({
  vendor,
  initialProducts,
}: {
  vendor: Vendor;
  initialProducts: Product[];
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 8;

  // Dynamic filtering & sorting on client
  const filteredSortedProducts = products
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return 0; // Default no sort
    });

  const totalPages = Math.ceil(filteredSortedProducts.length / perPage);
  const paginatedProducts = filteredSortedProducts.slice(
    (page - 1) * perPage,
    page * perPage,
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <VendorHero name={vendor.name} logo={vendor.logo} />
        <DarkModeToggle />
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
        <ProductSearch onSearch={setSearch} />
        <SortDropdown onSortChange={setSort} />
      </div>

      <ProductGrid products={paginatedProducts} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
