import Link from "next/link";

type ComponentProps = {
  className?: string;
};

export default function AppNav({}: ComponentProps) {
  return (
    <nav
      id="navigation"
      className="absolute top-0 z-30 flex w-full flex-row justify-center overflow-hidden text-lg font-bold text-indigo-500 md:justify-end"
    >
      <ul className="mt-0 flex flex-row space-x-6 px-6 py-2 tracking-wide">
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
      <Link href={href} className="link-muted text-white">
        {title}
      </Link>
    </li>
  );
}
