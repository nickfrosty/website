import Link from "next/link";

export default function NowDetailsItem({
  children,
  className = "",
  id,
  href,
  title,
}) {
  return (
    <section className="space-y-3" id={`#${id}`}>
      <h2>
        <Link href={href}>
          <a className="space-x-5 text-4xl font-bold cursor-pointer hover:underline hover:text-yellow-500">
            <span className="text-indigo-600">#</span>
            <span>{title}</span>
          </a>
        </Link>
      </h2>

      {children}
    </section>
  );
}
