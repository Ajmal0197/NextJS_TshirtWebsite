/**
 * @type {import('next').NextConfig}
 */

//https://nextjs.org/docs/app/building-your-application/deploying/static-exports
//will create static files folder named 'out' that can hosted on any server after build(>npm run build)
module.exports = {
  // output: "export",
  // images: { unoptimized: true }, //when making website completely static use thisline
  images: {
    //https://nextjs.org/docs/app/building-your-application/optimizing/images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.stripe.com",
      },
    ],
  },
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

//"npm run serve out" will host website locally due to "serve" library
