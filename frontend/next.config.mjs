/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export", // Comentado para permitir rutas dinámicas y SSR
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
