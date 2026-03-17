
import nextPWA from 'next-pwa';

const withPWA = nextPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  scope: '/',
  sw: 'sw.js',
});

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withPWA(nextConfig);
