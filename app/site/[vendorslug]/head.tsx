import { getVendor } from "../utils/api";

interface HeadProps {
  params: { vendorSlug: string };
}

export default async function Head({ params }: HeadProps) {
  const vendor = await getVendor(params.vendorSlug);

  if (!vendor) return <title>Vendor Not Found</title>;

  return (
    <>
      <title>{vendor.name} | Padisquare Store</title>
      <meta
        name="description"
        content={`Browse products from ${vendor.name}`}
      />
      <meta property="og:title" content={`${vendor.name} | Padisquare Store`} />
      <meta
        property="og:description"
        content={`Check out ${vendor.name}'s products`}
      />
      <meta property="og:image" content={vendor.logo} />
    </>
  );
}
