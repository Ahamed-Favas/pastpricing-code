import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-full place-items-center bg-white px-4 py-16 sm:py-24 lg:px-6">
      <div className="text-center">
        <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">Page not found</h1>
        <p className="mt-4 text-pretty text-md font-medium text-gray-500 sm:text-lg">Sorry, we couldn’t find the page you’re looking for.</p>
        <div className="mt-8 flex items-center justify-center gap-x-4">
          <Link href="/" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go back home</Link>
        </div>
      </div>
    </main>
  );
}
