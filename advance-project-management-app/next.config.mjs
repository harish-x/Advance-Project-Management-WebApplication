/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: "/api/:path*", // Any request starting with `/api`
          destination: "http://localhost:8080/:path*", // Proxy to your backend
        },
      ];
    },
  };
  
  export default nextConfig;
  