import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ProductSkeleton() {
  return (
    <div className="product-container">
      <div>
      <div className="flex gap-9 xl:flex-row flex-col">
        {/* Skeleton for product image */}
        <div className="w-[100%] h-[256px] mx-auto">
          <Skeleton width="100%" height="100%" />
        </div>

        {/* Skeleton for product details */}
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">
              <Skeleton width={200} height={32} />
              <Skeleton width={150} height={20} />
            </div>

            {/* Skeleton for stars, bookmark, share icons */}
            <div className="flex items-center gap-3">
              <Skeleton circle width={20} height={20} />
              <Skeleton circle width={20} height={20} />
              <Skeleton circle width={20} height={20} />
            </div>
          </div>

          {/* Skeleton for price and review count */}
          <div className="product-info">
            <div className="flex flex-col gap-3">
              <Skeleton width={100} height={34} />
              <Skeleton width={80} height={21} />
            </div>

            <div className="flex flex-col">
              <Skeleton circle width={16} height={16} />
              <Skeleton width={50} height={16} className="mt-2" />
            </div>
          </div>
        </div>
      </div>
      <Skeleton className="mt-6 mb-3 gap-3" width="100%" height={40} />
      <Skeleton width="100%" height={40} />
      </div>
      {/* Skeleton for chart */}
      <Skeleton width="100%" height={300} />

      {/* Skeleton for recommendation */}
      {/* <p className="text-sm text-black opacity-50 mt-5">
        <Skeleton width={50} height={20} inline />
        <span> recommended to buy.</span>
      </p> */}
    </div>
  );
}

export default ProductSkeleton;
