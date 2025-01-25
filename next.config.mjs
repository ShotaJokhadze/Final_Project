import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export", // Outputs a Single-Page Application (SPA).
  // distDir: "./dist", // Changes the build output directory to `./dist/`.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
        port: "",
        pathname: "/**", // Adjust the path as needed; this allows all paths under the domain
      },
      {
        // Allow images from dummyjson.com
        protocol: "https",
        hostname: "dummyjson.com",
        pathname: "/**", // Allows all paths under dummyjson.com
      },
    ],
    domains: ["avatars.githubusercontent.com"],
  },
};

export default withNextIntl(nextConfig);
