import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Read this article",
  description: "Read more from this article to learn more.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className={`space-y-8 mx-auto w-full md:max-w-4xl`}>
      {children}
    </section>
  );
}
