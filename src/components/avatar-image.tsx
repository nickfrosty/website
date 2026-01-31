import Image from "next/image";

import clsx from "clsx";

import nickAvatar from "@/../public/img/nick.jpg";

type ComponentProps = {
  className?: string;
  sizeClass?: string;
};

export default function AvatarImage({ className, sizeClass }: ComponentProps) {
  return (
    <span className={clsx("block rounded-full", sizeClass, className)}>
      <Image
        className={clsx(
          "avatar place-self-center rounded-full border border-gray-800 shadow",
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
