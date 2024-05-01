type DefaultMetadataFields = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
};

export function parseFrontmatter<MetadataFields = DefaultMetadataFields>(
  fileContent: string,
) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const removeQuoteRegex = /^['"](.*)['"]$/;

  const frontMatterLines = frontmatterRegex
    .exec(fileContent)![1]
    .trim()
    .split("\n");
  const content = fileContent.replace(frontmatterRegex, "").trim();

  const metadata: Partial<MetadataFields> = {};
  let currentKey: string | null = null;

  function appendValue(
    key: keyof MetadataFields,
    value: string,
    makeArray: boolean = false,
  ) {
    // @ts-ignore
    if (makeArray && !Array.isArray(metadata[key])) metadata[key] = [];
    // @ts-ignore
    else if (typeof metadata[key] == "undefined") metadata[key] = "";

    if (makeArray || Array.isArray(metadata[key])) {
      // @ts-ignore
      metadata[key].push(value);
    } else {
      // @ts-ignore
      metadata[key] += (" " + value).trim();
    }
  }

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(/: ?/);

    if (key.trim().startsWith("#") || valueArr[0]?.trim().startsWith("#"))
      return;

    // handle multi line entries
    if (key.startsWith(" ") && currentKey !== null) {
      line = line.trim();

      // handle bulleted entries (aka arrays)
      if (line.startsWith("-")) {
        line = line
          .replace(/- (?:.*: )?(.*)/, "$1")
          .replace(removeQuoteRegex, "$1");

        // todo: supported keyed arrays (` - example: add support`)

        return appendValue(currentKey as keyof MetadataFields, line, true);
      }

      return appendValue(currentKey as keyof MetadataFields, line);
    }
    // handle keyed lines
    else {
      if (
        currentKey &&
        Object.hasOwn(metadata, currentKey) &&
        typeof metadata[currentKey as keyof MetadataFields] == "string"
      ) {
        metadata[currentKey as keyof MetadataFields] = (
          metadata[currentKey as keyof MetadataFields] || ""
        )
          // @ts-ignore
          .trim()
          .replace(removeQuoteRegex, "$1")
          .trim();
      }

      currentKey = key.trim();
      let value = valueArr.join(": ").trim().replace(removeQuoteRegex, "$1");
      appendValue(currentKey as keyof MetadataFields, value);
      //   metadata[currentKey as keyof Metadata] = value;
    }

    // @ts-ignore
    if (key.startsWith("_")) delete metadata[key];
  });

  return { metadata: metadata as MetadataFields, content };
}
