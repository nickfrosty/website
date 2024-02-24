import clsx from "clsx";
import Image from "next/image";
import nickAvatar from "@/../public/img/nick.jpg";

type ComponentProps = {
  className?: string;
  sizeClass?: string;
};

export default function AvatarImage({ className, sizeClass }: ComponentProps) {
  return (
    <span className={clsx("inline-block", sizeClass, className)}>
      <Image
        className={clsx(
          "place-self-center avatar border rounded-full shadow border-gray-800",
          sizeClass,
          className,
        )}
        src={nickAvatar}
        width={256}
        height={256}
        alt="Nick Frostbutter"
      />
    </span>
  );
}
