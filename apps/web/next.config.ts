import type { NextConfig } from 'next';

const isGithubPages = process.env.GITHUB_PAGES === 'true'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isGithubPages ? '/my-app' : '',
  assetPrefix: isGithubPages ? '/my-app/' : '',
  // reactStrictMode: true,
};

module.exports = nextConfig;