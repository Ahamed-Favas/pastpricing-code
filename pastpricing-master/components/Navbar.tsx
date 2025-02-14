import Link from "next/link"

const Navbar = () => {
  return (
    <div className="w-full container mx-auto">
      <div className="w-full flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-3xl"
        >
          Past
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
            Pricing
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Navbar