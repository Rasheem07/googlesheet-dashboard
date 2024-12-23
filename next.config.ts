import createNextIntlPlugin from 'next-intl/plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';
import { NextConfig } from 'next';
const withNextIntl = createNextIntlPlugin();

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  // Your existing Next.js configuration
  compress: true,
  reactStrictMode: true,
  experimental: {
    reactCompiler: true
  },
  // headers: async () => {
  //   return [
  //     // Cache everything except src/app/api and src/actions
  //     {
  //       source: '/(.*)',  // Matches all routes
  //       headers: [
  //         {
  //           key: 'Cache-Control',
  //           value: 'public, max-age=31536000, immutable',  // Cache for 1 year
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default bundleAnalyzer(withNextIntl(nextConfig));
