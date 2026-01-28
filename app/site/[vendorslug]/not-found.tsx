export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-4">
      <h2 className="text-xl font-semibold">Vendor not found</h2>

      <p className="text-sm text-gray-600">
        The vendor storefront you are looking for does not exist.
      </p>
    </div>
  );
}
