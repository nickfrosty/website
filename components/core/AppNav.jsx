import Link from "next/link";

export default function AppNav({ className }) {
  return (
    <nav
      id="navigation"
      className="flex overflow-hidden absolute top-0 z-30 flex-row justify-center w-full text-lg font-bold text-indigo-500 md:justify-end"
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

function LinkItem({ href, title }) {
  return (
    <li>
      <Link href={href}>
        <a className="hover:text-yellow-500">{title}</a>
      </Link>
    </li>
  );
}
