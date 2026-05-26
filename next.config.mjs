import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactStrictMode: true,
  webpack: config => {
    config.resolve.fallback = { fs: false, path: false };
    // Externalize sharp to prevent webpack from bundling it
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push("sharp");
    }

    // Inject __DEV__ as a compile-time constant (like React Native)
    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: process.env.NODE_ENV === "development",
      }),
    );

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
