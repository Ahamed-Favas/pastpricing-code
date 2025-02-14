"use client"
import React from "react";
import Image from "next/image";
import Searchbar from "@/components/Searchbar";
// import HeroCarousel from "@/components/HeroCarousel";
// import { ArrowRight, BarChart2, Bell, Store } from "lucide-react";
// import HeroCarousel from "@/components/HeroCarousel";

const Home = () => {
  return (
    <>
      <section className="px-6 md:px-20 py-24 bg-gray-50">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Smart Shopping Starts Here:
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>

            <h1 className="head-text">
              Unleash the Power of{" "}
              <span className="text-primary">PriceWise</span>
            </h1>
            <p className="mt-6">
              Powerful, self-serve product and growth analytics to help you
              convert, engage, and retain more.
            </p>
              <Searchbar />
            
          </div>
          {/* <HeroCarousel /> */}
        </div>
      </section>
      {/* <section className="trending-section">
        <h2 className="section-text">Trending</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {["Apple Iphone 15", "Book", "Sneakers"].map((product) => (
            <div key={product}>{product}</div>
          ))}
        </div>
      </section> */}

      <section className="px-6 md:px-20 py-24">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Steps to Check Price History
        </h2>
        <p className="text-xl text-center mb-12">
          Find the right price of any product using just 2 simple steps
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="text-primary mb-4" />
            <Image
              src="/assets/icons/clipboard-paste.svg"
              alt="star"
              width={42}
              height={42}
            />

            <h3 className="text-xl font-semibold mb-2">Step 1</h3>
            <p>
              Just copy and paste the link of any product from online stores
              like Flipkart or Amazon in the search bar above.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="text-primary mb-4" />
            <Image
              src="/assets/icons/chart-no-axes-column.svg"
              alt="star"
              width={42}
              height={42}
            />

            <h3 className="text-xl font-semibold mb-2">Step 2</h3>
            <p>
              Discover its price history, find the lowest price, highest price,
              and find the right price.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
