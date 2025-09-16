/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placeholder.svg",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
