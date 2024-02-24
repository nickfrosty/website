import Link from "next/link";

type ComponentProps = {
  className?: string;
  children: React.ReactNode;
  id: number | string;
  href: string;
  title: string;
};

export default function NowDetailsItem({
  className,
  children,
  id,
  href,
  title,
}: ComponentProps) {
  return (
    <section className="space-y-3" id={`#${id}`}>
      <h2>
        <Link
          href={href}
          className="inline-flex items-center space-x-4 text-4xl !font-semibold cursor-pointer reverse-link"
        >
          <span className="!font-normal text-5xl">#</span>
          <span>{title}</span>
        </Link>
      </h2>

      {children}
    </section>
  );
}
