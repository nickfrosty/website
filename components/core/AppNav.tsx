import Link from "next/link";

type CustomProps = {
  className?: string;
};

export default function AppNav({}: CustomProps) {
  return (
    <nav
      id="navigation"
      className="absolute top-0 z-30 flex flex-row justify-center w-full overflow-hidden text-lg font-bold text-indigo-500 md:justify-end"
    >
      <ul className="flex flex-row px-6 py-2 mt-0 space-x-6 tracking-wide">
        <LinkItem href="/articles" title="Articles" />
        <LinkItem href="/blog" title="Blog" />
        <LinkItem href="/projects" title="Projects" />
        <LinkItem href="/now" title="Now" />
      </ul>
    </nav>
  );
}

type LinkItemProps = {
  href: string;
  title: string;
};

function LinkItem({ href, title }: LinkItemProps) {
  return (
    <li>
      <Link href={href} className="hover:text-yellow-500">
        {title}
      </Link>
    </li>
  );
}
