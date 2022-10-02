/* eslint-disable @next/next/no-img-element */

export default function ImagePage() {
  return (
    <main className="h-[720px] w-[1280px] mx-auto my-8 rounded-3xl border-8 border-indigo-500 static">
      <section className="relative h-full">
        <section className="p-8">
          {/* <p className="flex place-items-center text-xl text-gray-500">
            <span className="">January 21, 2022</span>
          </p> */}

          <h1 className="text-8xl font-semibold">
            This is the title of this article
          </h1>
        </section>

        <section className="absolute bottom-0 p-8 w-full">
          <hr className="border-2" />

          <section className="flex justify-between place-items-center w-full">
            <div className="flex place-items-center space-x-5">
              <div className="overflow-hidden w-32 h-32 rounded-full border-4 border-white shadow">
                <img
                  src="/img/nick.jpg"
                  className=""
                  alt={"Nick Frostbutter"}
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-5xl font-semibold text-yellow-500">
                  Nick Frostbutter
                </h3>

                <h4 className="text-2xl">nick.af</h4>
              </div>
            </div>

            <div className="">
              <span className="text-4xl font-semibold">@nickfrosty</span>
            </div>
          </section>
        </section>
      </section>
    </main>
  );
}
