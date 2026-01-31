// import { SmallCard } from "@/components/cards/small-card";
import {
  // HeartIcon,
  HandThumbUpIcon,
  ShareIcon,
  DocumentDuplicateIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";

type ComponentProps = {
  className?: string;
};

export default function ArticleSidebar({}: ComponentProps) {
  return (
    <aside className="sticky top-34 col-span-3 w-full space-y-10 place-self-start">
      {/* Reaction buttons */}
      <section className="grid w-full grid-cols-2 gap-6">
        <button className="hover-outline items-center space-y-3 rounded-2xl bg-gray-700 px-4 py-7 text-center">
          <div className="icon-base mx-auto text-white">
            <HandThumbUpIcon className="mx-auto" />
          </div>
          <p className="text-xl font-bold">
            {"32"}
            {/* {Math.floor(Math.random() * 100)} */}
          </p>
          <p className="font-semibold uppercase">Like</p>
        </button>
        <button className="hover-outline items-center space-y-3 rounded-2xl bg-gray-700 px-4 py-7 text-center">
          <div className="icon-base mx-auto text-white">
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
      <section className="flex w-full justify-center space-x-4">
        <button className="text-gray-500 hover:text-white">
          <ShareIcon className="icon-base mx-auto" />
        </button>
        <button className="text-gray-500 hover:text-white">
          <DocumentDuplicateIcon className="icon-base mx-auto" />
        </button>
      </section>

      {/* Related article */}
      {/* <section className="">
        <h3 className="mb-4 text-base font-bold text-center uppercase">
          Related Article
        </h3>

        <SmallCard title="Example related article" href="/articles/derp" />
      </section> */}
    </aside>
  );
}
