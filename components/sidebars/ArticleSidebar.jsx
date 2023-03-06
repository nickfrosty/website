// import Link from "next/link";
// import { SmallCard } from "~/components/cards/SmallCard";
import {
  // HeartIcon,
  ThumbUpIcon,
  ShareIcon,
  DuplicateIcon,
  ChatAlt2Icon,
} from "@heroicons/react/24/outline";

export default function ArticleSidebar() {
  return (
    <aside className="sticky col-span-3 place-self-start space-y-10 w-full top-34">
      {/* Reaction buttons */}
      <section className="grid grid-cols-2 gap-6 w-full">
        <button className="items-center px-4 py-7 space-y-3 text-center bg-gray-700 rounded-2xl hover-outline">
          <div className="mx-auto text-white icon-base">
            <ThumbUpIcon className="mx-auto" />
          </div>
          <p className="text-xl font-bold">
            {"32"}
            {/* {Math.floor(Math.random() * 100)} */}
          </p>
          <p className="font-semibold uppercase">Like</p>
        </button>
        <button className="items-center px-4 py-7 space-y-3 text-center bg-gray-700 rounded-2xl hover-outline">
          <div className="mx-auto text-white icon-base">
            <ChatAlt2Icon className="mx-auto" />
            {/* <HeartIcon className="mx-auto" /> */}
          </div>
          <p className="text-xl font-bold">
            {"7"}
            {/* {Math.floor(Math.random() * 100)} */}
          </p>
          <p className="font-semibold uppercase">Discuss</p>
          {/* <p className="uppercase">Love</p> */}
        </button>
      </section>

      {/* Share buttons */}
      <section className="flex justify-center space-x-4 w-full">
        <button className="text-gray-500 hover:text-white">
          <ShareIcon className="mx-auto icon-base" />
        </button>
        <button className="text-gray-500 hover:text-white">
          <DuplicateIcon className="mx-auto icon-base" />
        </button>
      </section>

      {/* Related article */}
      {/* <section className="">
						<h3 className="mb-4 text-base font-bold text-center uppercase">
							Related Article
						</h3>

						<SmallCard
							title="Example related article"
							href="/articles/derp"
						/>
					</section> */}
    </aside>
  );
}
