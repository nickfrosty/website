import clsx from "clsx";
import Image from "next/image";

export default function AvatarImage({ className = null, sizeClass = null }) {
  return (
    <div
      className={clsx(
        "overflow-hidden rounded-full shadow",
        sizeClass,
        className,
      )}
    >
      <Image
        className={clsx("place-self-center avatar", sizeClass, className)}
        src="/img/nick.jpg"
        width={256}
        height={256}
        alt="Nick Frostbutter"
      />
    </div>
  );
}
