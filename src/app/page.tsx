import type { Metadata } from "next";

import Link from "next/link";

import { ArrowRightIcon } from "@heroicons/react/24/solid";

import AvatarImage from "@/components/avatar-image";
import { PageViewTracker } from "@/components/content/page-view-tracker";
import { NewsletterSubscribeForm } from "@/components/newsletter/newsletter-subscribe-form";
import ProjectCard from "@/components/project-card";
import SocialIcons from "@/components/social-icons";
import { SITE } from "@/lib/config";
import { getAllProjects } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: {
    absolute: SITE.name,
  },
  description:
    "I'm Nick, a full stack developer and submariner working on various " +
    "projects. I like to write code, technical articles, and build software products.",
};

export default async function Page() {
  const allProjects = await getAllProjects();
  const projects = allProjects.filter(item => item.frontmatter.homepage == true).slice(0, 3);

  return (
    <PageViewTracker>
      <section className="mx-auto mt-4 grid max-w-6xl grid-cols-1 items-center gap-10 md:gap-30 lg:grid-cols-2">
        <section className="grid grid-cols-2 items-center gap-10 sm:gap-5 md:grid-cols-3 md:items-center md:gap-8 lg:block">
          <div className="col-span-2 mx-auto mb-5 block auto-cols-auto text-center sm:col-span-1 md:text-left">
            <Link href="/" className="inline-block">
              <AvatarImage sizeClass={"w-52 h-52 md:w-48 md:h-48 lg:w-32 lg:h-32"} />
            </Link>
          </div>

          <p className="col-span-2 whitespace-pre-line text-2xl sm:col-span-2 sm:text-2xl">
            <span className="mb-5 inline-block text-3xl lg:mb-0 lg:text-2xl">
              Hi! I&apos;m Nick,
            </span>
            <br className="lg:hidden" /> a{" "}
            <Link
              href="https://github.com/nickfrosty"
              target="_blank"
              className="link-active"
              title="@nickfrosty on GitHub"
            >
              full stack developer
            </Link>{" "}
            and submarine veteran. Even in my free time, I like to{" "}
            <Link href="/projects" className="link-active" title="View a list of my projects">
              write code
            </Link>{" "}
            and{" "}
            <Link href="/articles" className="link-active" title="View my technical articles">
              technical articles
            </Link>
            .
          </p>

          <SocialIcons className="space-x-6 text-gray-300 md:pt-8" iconSize="w-8 h-8" />

          <p className="col-span-2 space-y-5 text-xl md:mt-10 xl:mt-14">
            Here, you can find{" "}
            <Link href="/now" className="link-active">
              what I am working on now
            </Link>{" "}
            and my{" "}
            <Link href="/newsletter" className="link-active">
              latest newsletter
            </Link>{" "}
            posts.
          </p>

          <NewsletterSubscribeForm
            className="col-span-full md:mt-10 xl:mt-14"
            title="Subscribe to my newsletter?"
          />
        </section>

        <section className="grid gap-8 xl:gap-12">
          {projects && projects && (
            <div className="order-2 md:order-1">
              <hr className="mb-14 md:hidden" />

              <h2 className="my-10 text-3xl font-bold">My Projects in Focus</h2>

              <div className="mb-3 grid grid-cols-1 gap-8 md:grid-cols-2 lg:block">
                {projects.map(project => (
                  <ProjectCard
                    key={project.frontmatter.title}
                    project={{
                      ...project.frontmatter,
                      href: project.href,
                    }}
                    showDateRange={false}
                  />
                ))}
              </div>

              <Link
                href="/projects"
                className="flexer link-muted inline-flex space-x-3 text-lg font-medium shadow-indigo"
              >
                <span>View more projects</span>
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </div>
          )}
        </section>
      </section>
    </PageViewTracker>
  );
}
