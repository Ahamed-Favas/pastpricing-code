// const isValidEcommLink = (url)=> {
//   try {
//     const parsedUrl = new URL(url);
//     const hostName = parsedUrl.hostname;
//     const cleanedUrl =
//       (parsedUrl.origin + parsedUrl.pathname).at(-1) === "/"
//         ? (parsedUrl.origin + parsedUrl.pathname).slice(0, -1)
//         : (parsedUrl.origin + parsedUrl.pathname);

//     if (hostName.includes("amazon.in") && parsedUrl.pathname) {
//       return [true, "amazon", cleanedUrl];
//     }
//     if (hostName.includes("flipkart.com") && parsedUrl.pathname) {
//       return [true, "flipkart", cleanedUrl];
//     }
//   } catch (error) {
//     return [false, "", ""];
//   }
// };
// console.log(
//   isValidEcommLink(
//     "https://www.flipkart.com/wearable-smart-devices/smart-watches/pr?sid=ajy%2Cbuh&marketplace=FLIPKART&p%5B%5D=facets.brand%255B%255D%3DNoise&p%5B%5D=facets.fulfilled_by%255B%255D%3DPlus%2B%2528FAssured%2529&param=464245&ctx=eyJjYXJkQ29udGV4dCI6eyJhdHRyaWJ1dGVzIjp7InZhbHVlQ2FsbG91dCI6eyJtdWx0aVZhbHVlZEF0dHJpYnV0ZSI6eyJrZXkiOiJ2YWx1ZUNhbGxvdXQiLCJpbmZlcmVuY2VUeXBlIjoiVkFMVUVfQ0FMTE9VVCIsInZhbHVlcyI6WyJGcm9tIOKCuTEsMDk5Il0sInZhbHVlVHlwZSI6Ik1VTFRJX1ZBTFVFRCJ9fSwidGl0bGUiOnsibXVsdGlWYWx1ZWRBdHRyaWJ1dGUiOnsia2V5IjoidGl0bGUiLCJpbmZlcmVuY2VUeXBlIjoiVElUTEUiLCJ2YWx1ZXMiOlsiTm9pc2UgU21hcnR3YXRjaGVzIl0sInZhbHVlVHlwZSI6Ik1VTFRJX1ZBTFVFRCJ9fSwiaGVyb1BpZCI6eyJzaW5nbGVWYWx1ZUF0dHJpYnV0ZSI6eyJrZXkiOiJoZXJvUGlkIiwiaW5mZXJlbmNlVHlwZSI6IlBJRCIsInZhbHVlIjoiU01XR0VIN1ZHWU1HQ1AzViIsInZhbHVlVHlwZSI6IlNJTkdMRV9WQUxVRUQifX19fX0%3D"
//   )
// );


const fp_url =
  "https://www.flipkart.com/noise-crew-go-1-39-display-bt-calling-metal-strap-7-days-battery-life-smartwatch/p/itm975f32d9f747a?pid=SMWGZW3C8Q3VQCSY&lid=LSTSMWGZW3C8Q3VQCSYIDMS15&marketplace=FLIPKART&store=ajy%2Fbuh&srno=b_1_11&otracker=browse&fm=organic&iid=en_eRVeF4_Y-GfIEvoBq8N8I_OdLSVU1FV4JbRRGQjWshn7xZEdDk79zs98NY0dkauUMw9eCK0egx3ic5JzVfbuleo15S0a61Wzzbg3qNOknKY%3D&ppt=browse&ppn=browse";

const isValidFpEcommLink = (url) => {
  try {
    const parsedUrl = new URL(url);
    const hostName = parsedUrl.hostname;
    // const searchParams = parsedUrl.searchParams
    // console.log(searchParams)
    const cleanedUrl =
      (parsedUrl.origin + parsedUrl.pathname).at(-1) === "/"
        ? (parsedUrl.origin + parsedUrl.pathname).slice(0, -1)
        : parsedUrl.origin + parsedUrl.pathname;
    
    const cl_fp_url =
      parsedUrl.searchParams.get('pid')? cleanedUrl +
      "?pid=" +
      parsedUrl.searchParams.get('pid'): cleanedUrl

    // const itm_id = cleanedUrl.split('/').at(-1)
    console.log(cl_fp_url);

    if (hostName.includes("amazon.in") && parsedUrl.pathname) {
      return [true, "amazon", cleanedUrl];
    }
    if (hostName.includes("flipkart.com") && parsedUrl.pathname) {
      return [true, "flipkart", cleanedUrl];
    }
  } catch (error) {
    return [false, "", ""];
  }
};

console.log(isValidFpEcommLink(fp_url))