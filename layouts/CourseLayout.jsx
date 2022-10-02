import { NextSeo } from "next-seo";
import AppFooter from "~/components/core/AppFooter";
import AppHeader from "~/components/core/AppHeader";

export default function Layout({ seo, children }) {
	if (seo === undefined) seo = {};

	return (
		<>
			<NextSeo {...seo} />

			<AppHeader />

			<section className="container-inner grid grid-cols-12">
				<aside className="sticky top-16 col-span-3 place-self-start p-8 space-y-5">
					{["", "", "", "", "", ""].map((item) => {
						return (
							<section className="" key={item.id}>
								<h4
									htmlFor=""
									className="text-sm font-bold uppercase"
								>
									Section title
								</h4>
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
