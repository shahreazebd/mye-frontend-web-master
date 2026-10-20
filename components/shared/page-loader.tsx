import Image from "next/image";

export default function PageLoader() {
  return (
    <main className="grid h-[calc(100vh-65px)] place-items-center bg-white px-6 lg:px-8">
      <div className="flex place-items-center text-center">
        <Image
          src="/gif/loading.gif"
          alt="..."
          height={100}
          width={100}
          className="size-12"
          unoptimized
        />
        <p className="text-dark-600 ml-2 text-base font-semibold">Loading...</p>
      </div>
    </main>
  );
}
