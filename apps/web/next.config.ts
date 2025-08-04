import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const isGithubPages = process.env.NEXT_PUBLIC_GITHUB_PAGES === 'true';
const repo = 'project-root'; // <-- nazwę repozytorium wpisz tu

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isGithubPages ? `/${repo}` : '',
  assetPrefix: isGithubPages ? `/${repo}/` : '',
  reactStrictMode: false,
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);