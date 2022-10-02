import Link from "next/link";

export function FloatLabel({
  label = "draft",
  href = null,
  display = true,
  className = "",
  overlay = false,
}) {
  // define the actual content to display
  const spanner = (
    <span
      className={`inline-code text-white ${
        overlay ? "absolute z-10 mt-2 ml-2" : ""} ${className}`}
    >
      {label}
    </span>
  );

  // display the correctly formatted item
  if (display) {
    if (href) {
      <Link href={href}>{spanner}</Link>;
    } else return spanner;
  } else return <></>;
}
