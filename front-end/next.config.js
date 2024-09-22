/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.1.13',
      },
      {protocol: 'http', hostname:'192.168.10.157'},
      {protocol: 'http', hostname: '192.168.3.23' },
      {protocol: 'http', hostname: '192.168.1.183' },
      {
        protocol: 'http',
        hostname: '192.168.1.9',
      },
      {
        protocol: 'https',
        hostname: 'www.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'tailwindui.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'shopo.quomodothemes.website',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'swiperjs.com',
      },
    ],
  },
}

module.exports = nextConfig
