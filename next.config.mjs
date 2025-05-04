import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler:{
        styledComponents: true
    },
    webpack(config) {
        config.resolve.alias['@'] = path.resolve('.');
        return config;
      },
};

export default nextConfig;
