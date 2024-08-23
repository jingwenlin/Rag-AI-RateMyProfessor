// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    },
  };
  
  export default nextConfig;
  