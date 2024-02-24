import Link from "next/link";

type ComponentProps = {
  className?: string;
  iconSize: string;
};

export default function SocialIcons({
  className = "",
  iconSize,
}: ComponentProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <Link
        href="https://twitter.com/nickfrosty"
        aria-label="@nickfrosty on Twitter"
        title="@nickfrosty on Twitter"
        target="_blank"
        rel="noreferrer"
        className="no-underline hover:text-blue-500"
      >
        <svg
          className={`${iconSize} fill-current`}
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="twitter"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
          ></path>
        </svg>
      </Link>
      <Link
        href="https://youtube.com/nickfrosty"
        aria-label="Nick Frostbutter on YouTube"
        title="Nick Frostbutter on YouTube"
        target="_blank"
        rel="noreferrer"
        className="no-underline hover:text-red-600"
      >
        <svg
          className={`${iconSize} fill-current`}
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="youtube"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path
            fill="currentColor"
            d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
          ></path>
        </svg>
      </Link>
      <Link
        href="https://indiehackers.com/nickfrosty"
        aria-label="@nickfrosty on IndieHackers"
        title="@nickfrosty on IndieHackers"
        target="_blank"
        rel="noreferrer"
        className="no-underline hover:text-white"
      >
        <svg
          className={`${iconSize} fill-current`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 120 120"
        >
          <rect
            className="background"
            x="0"
            y="0"
            height="120"
            width="120"
            fill=""
          />
          <g className="text" fill="hsl(210, 60%, 14%)">
            <rect className="text__i" x="27" y="34" height="52" width="12" />
            <rect className="text__h" x="51" y="34" height="52" width="12" />
            <rect className="text__h" x="61" y="54" height="12" width="22" />
            <rect className="text__h" x="81" y="34" height="52" width="12" />
          </g>
        </svg>
      </Link>
      <Link
        href="https://github.com/nickfrosty"
        aria-label="@nickfrosty on GitHub"
        title="@nickfrosty on GitHub"
        target="_blank"
        rel="noreferrer"
        className="no-underline hover:text-gray-800 dark:hover:text-white"
      >
        <svg
          className={`${iconSize} fill-current`}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      </Link>
    </div>
  );
}
