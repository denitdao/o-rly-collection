import Link from "next/link";

const OrlyHeader = () => {
  return (
    <header className="px-4 py-16">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col items-center">
        <h1 className="mb-5 text-4xl font-extrabold tracking-tight text-black">
          Search O&apos;RLY Covers
        </h1>
        <p className="text-center font-mono tracking-tight text-gray-600">
          Strengthen your{" "}
          <Link
            href={"/"}
            className="underline decoration-blue-400 decoration-2 underline-offset-2"
          >
            arguments
          </Link>{" "}
          with compelling programming book covers
        </p>
      </div>
    </header>
  );
};

export default OrlyHeader;
