import { NextSeo, NextSeoProps } from "next-seo";
import clsx from "clsx";
import AppHeader from "@/components/core/AppHeader";
import AppFooter from "@/components/core/AppFooter";

type LayoutProps = {
  seo?: NextSeoProps;
  children?: React.ReactNode;
  className?: string;
  footer?: boolean;
};

export default function Layout({ seo, children }: LayoutProps) {
  return (
    <>
      <NextSeo {...seo} />

      <AppHeader />

      <section className="grid grid-cols-12 container-inner">
        <aside className="sticky col-span-3 p-8 space-y-5 top-16 place-self-start">
          {["", "", "", "", "", ""].map((item, id) => {
            return (
              <section className="" key={id}>
                <h4 className="text-sm font-bold uppercase">Section title</h4>
                <ul className="ml-4">
                  <li className="">
                    <a href="">Active sub link item</a>
                  </li>
                  <li className="">
                    <a href="" className="text-gray-500">
                      sub link item
                    </a>
                  </li>
                  <li className="">
                    <a href="" className="text-gray-500">
                      sub link item
                    </a>
                  </li>
                </ul>
              </section>
            );
          })}
        </aside>

        <main className="col-span-9 h-[2000px] space-y-3 p-9 flex-grow min-h-screen border-l border-gray-800">
          {children}
        </main>
      </section>

      <AppFooter />
    </>
  );
}
