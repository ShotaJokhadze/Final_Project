/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export", // Outputs a Single-Page Application (SPA).
  distDir: "./dist", // Changes the build output directory to `./dist/`.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
        port: "",
        pathname: "/**", // Adjust the path as needed; this allows all paths under the domain
      },
    ],
  },
};

export default nextConfig;
