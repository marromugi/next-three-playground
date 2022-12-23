/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  // webpack: (config, options) => {
  //   config.module.rules.push({
  //     test: /\.(frag|vert|glsl)$/,
  //     use: [
  //       options.defaultLoaders.babel,
  //       { loader: 'glslify-loader' },
  //       { loader: 'raw-loader' },
  //     ],
  //     exclude: /node_modules/,
  //   })
  //   return config
  // },
}

module.exports = nextConfig
