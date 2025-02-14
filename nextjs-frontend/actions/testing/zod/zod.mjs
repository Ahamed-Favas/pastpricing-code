// import { z } from "zod";

// // Define the schema for URLs with specific hostname and pathname
// const urlSchema = z.string().refine(
//   (value) => {
//     try {
//       const url = new URL(value); // Parse the URL
//       const validHostname = url.hostname === "example.com"; // Replace with your desired hostname
//       const validPathname = url.pathname.startsWith("/specific-path"); // Replace with your desired pathname condition
//       return validHostname && validPathname;
//     } catch {
//       return false; // If the string is not a valid URL
//     }
//   },
//   {
//     message:
//       "URL must have hostname 'example.com' and start with '/specific-path'",
//   }
// );

// // Test cases
// const testUrls = [
//   "https://example.com/specific-path/123",
//   "https://example.com/wrong-path",
//   "https://wrong.com/specific-path/123",
//   "not-a-url",
// ];

// testUrls.forEach((url) => {
//   const result = urlSchema.safeParse(url);
//   if (result.success) {
//     console.log(`${url} is valid`);
//   } else {
//     console.log(`${url} is invalid: ${result.error.issues[0].message}`);
//   }
// });

const fullpath =
  "https://www.amazon.in/Lifelong-Mixer-Grinder-Kitchen-Jars/dp/B09X5C9VLK/ref=lp_85164349031_1_1";

const lists = fullpath.split('/').map(val => (val.includes('ref='))? val: val)
console.log(lists)
lists.splice(0, lists.length, ...lists.filter());