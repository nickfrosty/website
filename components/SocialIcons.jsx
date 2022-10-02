import Image from "next/image";
import Link from "next/link";

export default function SocialIcons() {
  return (
    <>
      <div className="space-x-4">
        <Link href="https://twitter.com/nickfrosty">
          <a
            className="icon hover:text-twitter"
            title="@nickfrosty on Twitter"
            aria-label="@nickfrosty on Twitter"
            target="_blank"
            rel="noopener"
          >
            <Image
              src={"/img/social-icons/twitter.svg"}
              alt="@nickfrosty on Twitter"
              width={32}
              height={32}
            />
          </a>
        </Link>

        <Link href="https://github.com/nickfrosty">
          <a
            className="social-icon"
            title="@nickfrosty on GitHub"
            aria-label="@nickfrosty on GitHub"
            target="_blank"
            rel="noopener"
          >
            <Image
              src={"/img/social-icons/github.svg"}
              alt="@nickfrosty on GitHub"
              width={32}
              height={32}
            />
          </a>
        </Link>

        <Link href="https://linkedin.com/in/nickfrostbutter">
          <a
            className="icon hover:text-linkedin"
            title="Nick Frostbutter on LinkedIn"
            aria-label="Nick Frostbutter on LinkedIn"
            target="_blank"
            rel="noopener"
          >
            <Image
              src={"/img/social-icons/linkedin.svg"}
              alt="Nick Frostbutter on LinkedIn"
              width={32}
              height={32}
            />
          </a>
        </Link>

        <Link href="https://youtube.com/nickfrosty">
          <a
            className="icon hover:text-red-500"
            title="Nick Frostbutter on YouTube"
            aria-label="Nick Frostbutter on YouTube"
            target="_blank"
            rel="noopener"
          >
            <Image
              src={"/img/social-icons/youtube.svg"}
              alt="Nick Frostbutter on YouTube"
              width={32}
              height={32}
            />
          </a>
        </Link>

        <Link href="https://indiehackers.com/nickfrosty">
          <a
            className="social-icon"
            title="@nickfrosty on IndieHackers"
            aria-label="@nickfrosty on IndieHackers"
            target="_blank"
            rel="noopener"
          >
            <Image
              src={"/img/social-icons/indiehackers.svg"}
              alt="@nickfrosty on IndieHackers"
              width={32}
              height={32}
            />
          </a>
        </Link>

        <Link href="/newsletter">
          <a
            className="social-icon"
            title="My Personal Newsletter"
            aria-label="Personal Newsletter"
          >
            <Image
              src={"/img/social-icons/email.svg"}
              alt="My Personal Newsletter"
              width={32}
              height={32}
            />
          </a>
        </Link>
      </div>
    </>
  );
}
