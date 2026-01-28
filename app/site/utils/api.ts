// app/site/[vendorSlug]/utils/api.ts

const BASE_URL = "https://fake-store-api.mock.beeceptor.com/api";

/* ----------------------------------
   Types
---------------------------------- */
export interface Product {
  id: number;
  title: string;
  price: number;
  description?: string;
  image: string;
}

export interface Vendor {
  slug: string;
  name: string;
  logo: string;
}

/* ----------------------------------
   Mock Vendors
---------------------------------- */
const vendors: Vendor[] = [
  { slug: "vendor1", name: "Vendor One", logo: "/images/vendor1.png" },
  { slug: "vendor2", name: "Vendor Two", logo: "/images/vendor2.png" },
  { slug: "vendor3", name: "Vendor Three", logo: "/images/vendor3.png" },
];

/* ----------------------------------
   Get Vendor
---------------------------------- */
export async function getVendor(vendorSlug: string): Promise<Vendor | null> {
  return vendors.find((v) => v.slug === vendorSlug) ?? null;
}

/* ----------------------------------
   Get Products with Search / Sort / Pagination
---------------------------------- */
export async function getProductsByQuery(
  vendorSlug?: string,
  search: string = "",
  sort: "price-asc" | "price-desc" | "" = "",
  page: number = 1,
  perPage: number = 8,
): Promise<{ products: Product[]; total: number }> {
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      cache: "no-store", // important for dynamic filtering
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    // ✅ Explicit typing
    let data: Product[] = await res.json();

    /* -------------------------------
       Vendor filtering (mock)
    -------------------------------- */
    if (vendorSlug) {
      const vendorIndex = vendors.findIndex((v) => v.slug === vendorSlug);

      if (vendorIndex !== -1) {
        data = data.filter(
          (product) => product.id % vendors.length === vendorIndex,
        );
      }
    }

    /* -------------------------------
       Search
    -------------------------------- */
    if (search.trim()) {
      const query = search.toLowerCase();
      data = data.filter((product) =>
        product.title.toLowerCase().includes(query),
      );
    }

    /* -------------------------------
       Sorting
    -------------------------------- */
    if (sort === "price-asc") {
      data = [...data].sort((a, b) => a.price - b.price);
    }

    if (sort === "price-desc") {
      data = [...data].sort((a, b) => b.price - a.price);
    }

    /* -------------------------------
       Pagination
    -------------------------------- */
    const total = data.length;
    const start = (page - 1) * perPage;
    const end = start + perPage;

    const paginated = data.slice(start, end);

    return {
      products: paginated,
      total,
    };
  } catch (error) {
    console.error("getProductsByQuery error:", error);
    return {
      products: [],
      total: 0,
    };
  }
}
