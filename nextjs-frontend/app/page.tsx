"use client";
import React from "react";
import Image from "next/image";
import Searchbar from "@/components/Searchbar";
import TypewriterEffect from "@/components/StyleEffects/typing";

const Home = () => {
  return (
    <div className="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center">
      <section>
        <div className="flex flex-col w-full justify-center lg:items-start overflow-y-hidden">
          <h1 className="my-4 text-3xl md:text-5xl text-black opacity-75 font-bold leading-tight text-center md:text-left pb-4">
            Price History & Tracker
          </h1>
          <div className="flex gap-2 leading-normal text-base md:text-2xl text-center mb-8 md:text-left overflow-hidden">
            <span>
              Price Tracker, and Price History Chart for products from{" "}
              <span
                className="inline-block min-w-[70px] text-start whitespace-nowrap"
              >
                <TypewriterEffect />
              </span>
            </span>
          </div>
        </div>
      </section>

      <section className="w-full xl:w-4/5">
        <Searchbar />
      </section>

      {/* <section className="trending-section">
        <h2 className="section-text">Trending</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {["Apple Iphone 15", "Book", "Sneakers"].map((product) => (
            <div key={product}>{product}</div>
          ))}
        </div>
      </section> */}

      <section className="w-full px-6 md:px-20 py-24">
        <h2 className="text-3xl text-black opacity-65 font-bold mb-4 text-center">
          Steps to Check Price History
        </h2>
        <p className="text-xl text-center mb-12">
          Find the right price of any product using just 2 simple steps
        </p>

        <div className="grid py-8 md:grid-cols-2 gap-12">
          <div className="flex flex-col items-center text-center">
            <Image
              src="/assets/icons/clipboard-paste.svg"
              alt="star"
              width={42}
              height={42}
              className="mb-2"
            />

            <h3 className="text-black opacity-45 text-xl font-semibold mb-2">
              Step 1
            </h3>
            <p className="text-black opacity-45 max-w-md">
              Copy and paste link of ypur favourite product from online stores
              like Flipkart or Amazon in the search bar above.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Image
              src="/assets/icons/chart-no-axes-column.svg"
              alt="star"
              width={42}
              height={42}
              className="mb-2"
            />

            <h3 className="text-black opacity-45 text-xl font-semibold mb-2">
              Step 2
            </h3>
            <p className="text-black opacity-45 max-w-md">
              Discover its price history, find the lowest price, highest price,
              and find the price changes for a smarter shopping experience.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
