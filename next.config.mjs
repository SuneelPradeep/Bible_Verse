import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler:{
        styledComponents: true
    },
    webpack(config) {
        config.resolve.alias['@'] = path.resolve(__dirname, 'src');
        return config;
      }
};

export default nextConfig;
