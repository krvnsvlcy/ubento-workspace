import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Moved to the top level for Next.js 16+
  outputFileTracingRoot: path.join(__dirname, '../../'),
  
  // 2. Moved to the top level to fix the Turbopack workspace inference
  turbopack: {
    root: path.join(__dirname, '../../'),
  },

  experimental: {
    // Keep any other experimental flags you had here, but remove the two above
  },
  
  // ... the rest of your config
};

export default nextConfig;