/* eslint-disable @next/next/no-img-element */
// import Link from "next/link";

export function AuthorCard({
  data = null,
  image = null,
  children = null,
  className = "",
}) {
  return (
    <section className={`mx-auto space-x-5 max-w-2xl ${className} flexer box`}>
      <div className="avatar avatar-base"></div>
      <div className="">
        <h4 className="heading heading-md">Author Name Here</h4>
        <p className="text-sm text-gray-500">@username</p>
        <p className="">
          This is the bio and description of this particular author. This text
          can be up to 2 lines in height. No more than than because it could get
          too ugly. Or maybe just less than 200 characters?
        </p>
      </div>
    </section>
  );
}
