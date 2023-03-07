/* eslint-disable @next/next/no-img-element */
import AvatarImage from "~/components/AvatarImage";

type PageProps = {};

export default function Page({}: PageProps) {
  return (
    <main className="h-[720px] w-[1280px] mx-auto my-8 rounded-3xl border-8 border-indigo-500 static">
      <section className="relative h-full">
        <section className="p-8">
          {/* <p className="flex text-xl text-gray-500 place-items-center">
            <span className="">January 21, 2022</span>
          </p> */}

          <h1 className="font-semibold text-8xl">
            This is the title of this article
          </h1>
        </section>

        <section className="absolute bottom-0 w-full p-8">
          <hr className="border-2" />

          <section className="flex justify-between w-full place-items-center">
            <div className="flex space-x-5 place-items-center">
              <AvatarImage
                sizeClass={"w-32 h-32"}
                className="border-4 border-white"
              />

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
