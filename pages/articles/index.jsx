import { getDocsByPath, filterDocs, computePagination } from "zumo";

import DefaultLayout from "~/layouts/default";
import { CardGrid } from "~/components/cards/CardGrid";
import { SmallCard } from "~/components/cards/SmallCard";

// construct the meta data for the page
// import { basicMeta } from "~/utils/seoMetaData";
// const metaData = basicMeta({
const metaData = {
  title: "Articles",
  description: `Collection of "how-to" style tutorials and technical writings. Mostly centered around coding, devops, and content creators.`,
  baseHref: "/articles",
  // paginationTemplate: "/page/{id}",
};

export async function preparePage(currentPage) {
  let posts = await getDocsByPath("articles");

  // extract the `featured` posts
  const featured = filterDocs(posts, { featured: true }, 2);

  // remove the `featured` from the `posts`
  posts = posts?.filter((item) => !item?.meta?.featured);

  // construct the `pagination` data object
  const pagination = computePagination(
    posts.length,
    currentPage,
    metaData.baseHref,
    metaData?.paginationTemplate,
  );

  // chunk out the posts for the current page
  posts = posts.slice(pagination.start, pagination.end);

  return {
    props: { posts, featured, pagination },
  };
}

export async function getStaticProps({ params }) {
  return await preparePage(params?.page);
}

export default function ArticlePage({ posts, featured, pagination }) {
  return (
    <DefaultLayout seo={metaData}>
      {featured && featured?.length && pagination?.page <= 1 && (
        <section className="double-wide-cards">
          {featured.map((item) => {
            return (
              <SmallCard
                key={item.slug}
                {...item?.meta}
                baseHref={metaData.baseHref}
              ></SmallCard>
            );
          })}
        </section>
      )}

      <CardGrid
        posts={posts}
        baseHref={metaData.baseHref}
        pagination={pagination}
      />
    </DefaultLayout>
  );
}
