import type { Metadata } from "next";
import config from "@/lib/config";

export const metadata: Metadata = {
  title: `${config.siteName} - Projects`,
  description:
    "I'm always working on something. These are my main active " +
    "projects, and previous projects. All in various states.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className={`container mx-auto w-full max-w-4xl`}>
      {children}
    </section>
  );
}
