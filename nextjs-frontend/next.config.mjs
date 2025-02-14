// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     rewrites: async () => {
//         return [
//           {
//             source: "/api/:path*",
//             destination:
//               process.env.NODE_ENV === "development"
//                 ? "http://127.0.0.1:8000/api/:path*"
//                 : "/api/",
//           },
//         ];
//       },
// };

// export default nextConfig;

// // In the code snippet above, we define a rewrite rule that redirects any request matching the pattern /api/:path* to a specific destination. During development, the destination is set to http://127.0.0.1:8000/api/:path*, which means that API requests will be forwarded to a FastAPI server running locally. In a production environment, the destination is set to "/api/", indicating that API requests will be proxied to the same domain as the Next.js app.

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
