import Link from "next/link";

type ComponentProps = {
  className?: string;
  label?: "draft";
  href?: string;
  display?: boolean;
  overlay?: boolean;
};

export function FloatLabel({
  className,
  href,
  label = "draft",
  display = true,
  overlay = false,
}: ComponentProps) {
  // define the actual content to display
  const spanner: React.ReactNode = (
    <span
      className={`inline-code text-white ${
        overlay ? "absolute z-10 mt-2 ml-2" : ""
      } ${className}`}
    >
      {label}
    </span>
  );

  // display the correctly formatted item
  if (display) {
    if (href) {
      <Link href={href}>{spanner}</Link>;
    } else return <>{spanner}</>;
  }

  // always return a JSX element (to please the type checker)
  return <></>;
}
