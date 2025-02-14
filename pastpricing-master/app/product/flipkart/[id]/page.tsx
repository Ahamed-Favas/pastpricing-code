import { getFlipkartProduct } from "@/lib/mongodb/getProduct";
import ProductPage from "@/components/FlipkartProductPage";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const product = await getFlipkartProduct(params.id);

  if (!product) {
    notFound();
  }

  return <ProductPage product={product} />;
}
