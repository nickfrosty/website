import clsx from "clsx";

type ComponentProps = {
  className?: string;
  sizeClass?: string;
};

export default function AvatarImage({ className, sizeClass }: ComponentProps) {
  return (
    <span
      className={clsx(
        "block overflow-hidden rounded-full shadow",
        sizeClass,
        className,
      )}
    >
      <img
        className={clsx("place-self-center avatar", sizeClass, className)}
        src="/img/nick.jpg"
        width={256}
        height={256}
        alt="Nick Frostbutter"
      />
    </span>
  );
}
