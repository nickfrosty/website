// construct the meta data for the page
const metaData = {
  title: "Nope, couldn't find that page...",
  titleTemplate: "%s",
  description:
    "I swear this never happens. You found a page that does not exist, or I moved it. Or am hiding it from you?? 🙃",
};

export default function ErrorPage() {
  return (
    // <Layout seo={metaData} className="my-20 text-center md:space-y-16">
    <>
      <h1 className="text-5xl font-bold md:block">
        Well, this is embarrassing...
      </h1>
      <main className="max-w-xl mx-auto space-y-12 text-2xl">
        <p>
          You found a page that does not exist, or I moved it.
          <br />
          Or am hiding it from you?? 🙃
        </p>

        <p>
          You probably should not try to look for it,
          <br /> just move on.
        </p>
      </main>
    </>
  );
}
