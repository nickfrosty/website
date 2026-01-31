import Link from "next/link";

type ComponentProps = {
  className?: string;
  children: React.ReactNode;
  id: number | string;
  href: string;
  title: string;
};

export default function NowDetailsItem({ className, children, id, href, title }: ComponentProps) {
  return (
    <section className="space-y-3" id={`#${id}`}>
      <h2>
        <Link
          href={href}
          className="reverse-link inline-flex cursor-pointer items-center space-x-4 text-4xl !font-semibold"
        >
          <span className="text-5xl !font-normal">#</span>
          <span>{title}</span>
        </Link>
      </h2>

      {children}
    </section>
  );
}
