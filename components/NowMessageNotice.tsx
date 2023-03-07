type CustomProps = {
  className?: string;
};

export default function NowNotice({}: CustomProps) {
  return (
    <section className="px-8 text-gray-500 border-l-4 border-indigo-600">
      <p className="">
        PS: I am looking to start a new <b>full time</b> job in{" "}
        <b>Feb/Mar 2023</b>. Are you hiring or looking for a developer?
      </p>
      <p>
        Let&apos;s chat:
        <a
          href="https://linkedin.com/in/nickfrostbutter"
          target="_blank"
          rel="noreferrer"
          className="mx-2 underline reverse-link"
        >
          LinkedIn
        </a>
        {"|"}
        <a
          href="https://twitter.com/nickfrosty"
          target="_blank"
          rel="noreferrer"
          className="mx-2 underline reverse-link"
        >
          Twitter
        </a>
      </p>
    </section>
  );
}
