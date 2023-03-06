// import Link from "next/link";
// import { SmallCard } from "~/components/cards/SmallCard";
import {
  // HeartIcon,
  HandThumbUpIcon,
  ShareIcon,
  DocumentDuplicateIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";

export default function ArticleSidebar() {
  return (
    <aside className="sticky w-full col-span-3 space-y-10 place-self-start top-34">
      {/* Reaction buttons */}
      <section className="grid w-full grid-cols-2 gap-6">
        <button className="items-center px-4 space-y-3 text-center bg-gray-700 py-7 rounded-2xl hover-outline">
          <div className="mx-auto text-white icon-base">
            <HandThumbUpIcon className="mx-auto" />
          </div>
          <p className="text-xl font-bold">
            {"32"}
            {/* {Math.floor(Math.random() * 100)} */}
          </p>
          <p className="font-semibold uppercase">Like</p>
        </button>
        <button className="items-center px-4 space-y-3 text-center bg-gray-700 py-7 rounded-2xl hover-outline">
          <div className="mx-auto text-white icon-base">
            <ChatBubbleBottomCenterTextIcon className="mx-auto" />
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
      <section className="flex justify-center w-full space-x-4">
        <button className="text-gray-500 hover:text-white">
          <ShareIcon className="mx-auto icon-base" />
        </button>
        <button className="text-gray-500 hover:text-white">
          <DocumentDuplicateIcon className="mx-auto icon-base" />
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
