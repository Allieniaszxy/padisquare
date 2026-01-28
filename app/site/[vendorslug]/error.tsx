"use client";

type Props = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-4">
      <h2 className="text-lg font-semibold">Something went wrong</h2>

      <p className="text-sm text-gray-600 max-w-md">
        We couldn’t load this vendor storefront. Please try again.
      </p>

      <button
        onClick={reset}
        className="px-4 py-2 rounded-md bg-brand text-white"
      >
        Retry
      </button>
    </div>
  );
}
