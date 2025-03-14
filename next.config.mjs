/** @type {import('next').NextConfig} */
const nextConfig = {
    // 다른 Next.js 설정 ...
  };
  
  import withPWA from 'next-pwa';
  
  export default withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
  })(nextConfig);