import Link from "next/link";
import { Button } from "~/components/ui/button";

const OrlyHeader = () => {
  return (
    <header className="mx-auto flex w-full max-w-screen-2xl flex-col items-center px-4 pb-16 pt-4">
      <Link href="https://make.orlybooks.com/" className="mb-8 flex self-end">
        <div className="group relative">
          <span
            className="absolute inset-0 animate-rainbow rounded-md bg-[linear-gradient(90deg,theme('colors.red.300'),theme('colors.purple.300'),theme('colors.blue.300'),theme('colors.cyan.300'),theme('colors.lime.300'),theme('colors.orange.300'))] bg-[length:200%] blur-[5px] group-hover:blur-[2px]"
            aria-hidden="true"
          ></span>
          <Button
            variant="rainbow"
            className="relative font-mono text-sm font-normal"
          >
            Make Your Cover -&gt;
          </Button>
        </div>
      </Link>
      <h1 className="mb-5 text-center text-4xl font-extrabold text-black">
        Search O&apos;RLY Covers
      </h1>
      <h2 className="text-center font-mono text-gray-600">
        Strengthen your{" "}
        <Link
          href="/"
          className="underline decoration-blue-400 decoration-2 underline-offset-2"
        >
          arguments
        </Link>{" "}
        with compelling programming book covers
      </h2>
    </header>
  );
};

export default OrlyHeader;
