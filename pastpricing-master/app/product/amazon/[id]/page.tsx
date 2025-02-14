import { getAmazonProduct } from "@/lib/mongodb/getProduct";
import ProductPage from "@/components/AmazonProductPage";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const product = await getAmazonProduct(params.id);

  if (!product) {
    notFound();
  }

  return <ProductPage product={product} />;
}
