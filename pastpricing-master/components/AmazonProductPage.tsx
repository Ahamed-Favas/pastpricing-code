"use client";
import Image from "next/image";
import { NivoChart } from "@/lib/chart/NivoChart";
import Link from "next/link";
import PriceInfoCard from "@/components/PriceInfoCard";
import { priceAnalyzer } from "@/lib/calculations/analyze";
import { Product } from "@/types/productObject";
import { Suspense } from "react";
import Loading from "./loading";

export default function ProductPage({ product }: {product: Product | null}) {
  if(!product) return null
  // const router = useRouter();
  // console.log("product", product);
  
  const formatter = (val: any) => (val ? Intl.NumberFormat().format(val) : 0);
  const priceHistory = product?.priceHistory;
  const lastUpdated = new Date(product?.updatedAt);
  const  { 
    averagePrice,
    minimumPrice,
    maximumPrice,
    buyPercentage
  } = priceAnalyzer(priceHistory, product?.currentPrice);

  return (
    <Suspense fallback={<Loading />}>
      <div className="product-container">
        <div className="flex gap-28 xl:flex-row flex-col">

          {/* product image */}

          <div className="">
            <Image
              loader={() => product?.image}
              src={product?.image}
              alt={product?.title}
              width={256}
              height={256}
              className="mx-auto"
            />
          </div>

          {/* product?.title and link*/}

          <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
              <div className="flex flex-col gap-3">
                <p className="text-[18px] md:text-[28px] text-secondary font-semibold">
                  {product?.title}
                </p>

                <Link
                  href={product?.url}
                  target="_blank"
                  className="text-base text-black opacity-50"
                >
                  Visit Product
                </Link>
              </div>

              {/* stars bookmark share */}

              <div className="flex items-center gap-3">
                <div className="product-hearts">
                  <Image
                    src="/assets/icons/star.svg"
                    alt="star"
                    width={20}
                    height={20}
                  />

                  <p className="text-base font-semibold text-[#D46F77]">
                    {product?.stars}
                  </p>
                </div>

                <div className="p-2 bg-white-200 rounded-10">
                  <Image
                    src="/assets/icons/share.svg"
                    alt="share"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>

            {/* currentPrice originalPrice ReviewCount */}

            <div className="product-info">
              <div className="flex flex-col gap-3">
                <p className="text-[20px] md:text-[34px] text-secondary font-bold">
                  {product?.currency}
                  {formatter(product?.currentPrice)}
                </p>
                <p className="text-[18px] md:text-[21px] text-black opacity-50 line-through">
                  {product?.currency}
                  {formatter(product?.originalPrice)}
                </p>
              </div>

              <div className="flex flex-col">
                <div className="product-reviews">
                  <Image
                    src="/assets/icons/comment.svg"
                    alt="comment"
                    width={16}
                    height={16}
                  />
                  <p className="text-sm text-secondary font-semibold">
                    {product?.reviewsCount}
                  </p>
                </div>
              </div>
            </div>

            {/* currentPrice averagePrice highestPrice lowestPrice */}

            <div className="my-7">
              <div className="grid gap-5 md:flex md:gap-5 md:flex-wrap grid-cols-2">
                <PriceInfoCard
                  title="Current Price"
                  iconSrc="/assets/icons/price-tag.svg"
                  value={`${product?.currency}${formatter(
                    product?.currentPrice
                  )}`}
                />
                <PriceInfoCard
                  title="Average Price"
                  iconSrc="/assets/icons/chart.svg"
                  value={`${product?.currency}${formatter(
                    averagePrice
                  )}`}
                />
                <PriceInfoCard
                  title="Highest Price"
                  iconSrc="/assets/icons/arrow-up.svg"
                  value={`${product?.currency}${formatter(
                    maximumPrice
                  )}`}
                />
                <PriceInfoCard
                  title="Lowest Price"
                  iconSrc="/assets/icons/arrow-down.svg"
                  value={`${product?.currency}${formatter(minimumPrice)}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* chart */}

      <div className="flex-1 flex-col">
        <div
          className="chart-container overflow-x-clip min-w-10 pb-6"
          style={{ height: "600px" }}
        >
          <NivoChart priceHistory={priceHistory} lastUpdated={lastUpdated}/>
        </div>

        <div className="text-xl text-black opacity-80">
          <span className="text-primary-green font-semibold">
            {buyPercentage}%
          </span>{" "}
          recommended to buy at this time.
        </div>
      </div>
    </Suspense>
  );
}


// TODO implement out of stock condition
// TODO Make buypercentage recommendation more Eyecatchy