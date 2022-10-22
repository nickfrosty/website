import { paginateStaticPaths } from "zumo";

// import the parent page and its `prepare` action
import ParentPage from "../index";
import { preparePage } from "../index";

// compute the static paths for all the pagination pages
export async function getStaticPaths() {
  const pagination = await preparePage().then((res) => res?.props?.pagination);
  const paths = paginateStaticPaths(pagination);

  // console.log(paths);
  return paths;
}

// prepare the current pagination page for viewing
export async function getStaticProps({ params }) {
  return await preparePage(params?.page, params?.slug);
}

// render the actual page content
export default function PaginationPage2(props) {
  return ParentPage(props);
}
