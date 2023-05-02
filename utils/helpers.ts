/**
 * Regex for parsing headings from raw markdown
 * - note: this only parsed h4 and higher
 */
export const REGEX_MARKDOWN_HEADINGS = /^(#{1,4}) (.*)?$/gim;

/**
 * Regex for parsing markdown links
 * todo: add image support
 */
export const REGEX_MARKDOWN_LINKS = /\[([^\[]+)\]\((.*?)\)/gim;

/**
 * Regex for parsing HTML links
 * todo: add image support?
 */
export const REGEX_HTML_LINKS = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/gm;

/**
 * Regex for parsing relative HTML links
 * todo: add image support?
 */
export const REGEX_HTML_LINKS_RELATIVE =
  /<a\s+(?:[^>]*?\s+)?href=("|')([\/|\.].*?)\1/gm;

/**
 * Slugify a url string into a valid url form
 */
export function slugify(url: string) {
  return url
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

type HeadingObject = {
  heading: number;
};

/**
 * Generate a Table of Contents listing based on the markdowns headings
 */
export function generateTableOfContents(
  text: string,
): Array<HeadingObject> | undefined {
  return text.match(REGEX_MARKDOWN_HEADINGS)?.map((item) => {
    // strip out any links already in the heading (e.g. the anchor `#` link at the end)
    // extract the usable values (note the starting `,` in the array; this will ignore the first param)
    const [, hCount, label] = item
      .replace(REGEX_MARKDOWN_LINKS, "")
      .trim()
      .split(REGEX_MARKDOWN_HEADINGS);

    // construct a standardized heading object
    return {
      heading: hCount.length,
      value: label,
      slug: slugify(label),
    };
  });
}

/**
 * Convert all headings into linkable items
 */
export function linkifyHeadings(text: string, anchorBefore?: boolean) {
  // define a reusable variable
  let slug: string;

  // locate and parse all headings in the raw markdown text
  return text.replace(
    REGEX_MARKDOWN_HEADINGS,
    (_fullMatched, hCount, label) => {
      slug = slugify(label);

      // note: this adds the anchor above the heading element
      return `<a id="${slug}" />\n${hCount} ${label} [#](#${slug})`;
    },
  );
}

/**
 * Helper function to process all markdown links, including:
 * - converting all relative repo links to valid relative links for the site
 * todo: auto convert raw urls into valid links
 */
export function processMarkdownLinks(content: string) {
  // locate and parse all links in the raw markdown
  return content.replace(REGEX_MARKDOWN_LINKS, (fullMatched, label, url) => {
    // for errors in the regex, just return the original `fullMatched` string
    if (!label || !url) return fullMatched;

    // removed specific file extensions (".md", ".mdx", etc)
    url = url.split(/.mdx?|.html?/gi).join("");

    console.log("[url]", url);

    return `[${label}](https://nick.af/articles/${url})`;
  });
}

// force convert all h1 to h2
// content = content.replace(/^(#) /gm, "## ");

/**
 * Search and convert all relative anchor tags into their absolute equivalent
 */
export function convertRelativeAnchorsToAbsolute(
  content: string,
  base: string,
) {
  // define a reusable variable
  let newUrl: string;

  return content.replace(
    REGEX_HTML_LINKS_RELATIVE,
    (fullMatched: string, starter: string, url: string) => {
      // for errors in the regex, just return the original `fullMatched` string
      if (!starter || !url) return fullMatched;
      // only handle relative urls
      // if (!(url.startsWith("/") || url.startsWith("."))) return fullMatched;

      // removed specific file extensions (".md", ".html", etc)
      newUrl = url.split(/.mdx?|.html?/gi).join("");

      // convert the link to an absolute
      newUrl = makeAbsoluteUrl(base, newUrl);

      return fullMatched.replace(url, newUrl);
    },
  );
}

/**
 * Convert a `relative` url to its absolute equivalent, based on the provided `base`
 */
export function makeAbsoluteUrl(base: string, relative: string) {
  let st = base.split("/");
  let arr = relative.split("/");

  // ignore the current file name (or no string)
  st.pop();

  // handle when the `base` already contains the beginning of the `relative`
  if (arr[0] == "" && st[st.length - 1] == arr[1]) arr.splice(1, 1);

  // note: this will ignore if `base` is the current folder without having a trailing slash
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == "." || arr[i] == "") continue;
    if (arr[i] == "..") st.pop();
    else st.push(arr[i]);
  }
  return st.join("/");
}
