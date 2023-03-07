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
          className="space-x-5 text-4xl font-bold cursor-pointer hover:underline hover:text-yellow-500"
        >
          <span className="text-indigo-600">#</span>
          <span>{title}</span>
        </Link>
      </h2>

      {children}
    </section>
  );
}
