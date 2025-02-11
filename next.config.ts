/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-src 'self' https://td.doubleclick.net https://js.stripe.com https://www.recaptcha.net https://*.onshape.com https://fast.wistia.net https://fast.wistia.com https://www.youtube.com https://js.driftt.com https://www.googletagmanager.com https://next-o-auth-6gwa.vercel.app;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
