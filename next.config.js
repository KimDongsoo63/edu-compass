/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.ttf$/,
        type: 'asset/resource',
      });
      return config;
    },
  };
  
  module.exports = nextConfig;
  