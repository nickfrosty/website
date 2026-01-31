"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="my-20 text-center md:space-y-10">
      <h1 className="text-2xl font-bold md:text-3xl">Something went wrong</h1>

      <section className="mx-auto max-w-xl space-y-8 text-lg">
        <p>We&apos;re sorry, but something unexpected happened.</p>

        {/* <div className="flex items-center justify-center gap-4">
          <button onClick={() => reset()}>Try again</button>
          <a
            href="/"
            className="px-4 py-3 text-base border border-gray-700 rounded-md hover:border-gray-500"
          >
            Go home
          </a>
        </div> */}
      </section>
    </main>
  );
}
