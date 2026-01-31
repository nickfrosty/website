import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "I swear this never happens. You found a page that does not " +
    "exist, or I moved it. Or am hiding it from you?? 🙃",
};

export default function NotFound() {
  return (
    <main className="my-20 text-center md:space-y-10">
      <h1 className="md:block">Well, this is embarrassing...</h1>

      <section className="mx-auto max-w-xl space-y-12 text-2xl">
        <p>
          You found a page that does not exist, or I moved it.
          <br />
          Or am hiding it from you?? 🙃
        </p>

        <p>
          You probably should not try to look for it,
          <br /> just move on.
        </p>
      </section>
    </main>
  );
}
