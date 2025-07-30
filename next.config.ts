import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.ignoreWarnings = [
      {
        module: /node_modules\/sequelize/,
        message: /Critical dependency: the request of a dependency is an expression/,
      },
    ];
    return config;
  },
};

export default nextConfig;
