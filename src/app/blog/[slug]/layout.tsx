import type { Metadata } from "next";
import config from "@/lib/config";

export const metadata: Metadata = {
  title: `Read this blog post - ${config.siteName}`,
  description: "Read more from this blog post to learn more.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className={`container mx-auto w-full md:max-w-4xl`}>
      {children}
    </section>
  );
}
