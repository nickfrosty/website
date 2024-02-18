import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Read this blog post`,
  description: "Read more from this blog post to learn more.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className={`container mx-auto w-full md:max-w-4xl`}>
      {children}
    </section>
  );
}
