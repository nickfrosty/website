import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Read this blog post`,
  description: "Read more from this blog post to learn more.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className={`space-y-8 mx-auto w-full md:max-w-3xl`}>
      {children}
    </section>
  );
}
