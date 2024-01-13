import Link from "next/link";

const OrlyFooter = () => {
  return (
    <footer className="mt-auto bg-white p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-screen-xl text-center">
        <div
          className="mb-4 flex rounded-lg bg-blue-50 p-4 text-left text-sm text-blue-800"
          role="alert"
        >
          <svg
            className="mr-3 mt-[2px] inline h-4 w-4 flex-shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <div>
            <span className="font-mono font-bold">LEGAL NOTICE:</span>
            <ul className="ml-2 mt-1.5 list-inside list-disc">
              <li>
                This website is not affiliated with O&apos;Reilly Media, Inc.
              </li>
              <li>
                The covers shown here are intended for amusement and do not aim
                to discredit O&apos;Reilly Media in any way.
              </li>
              <li>
                All images are sourced from free online distribution and are not
                under the ownership of the website owner.
              </li>
            </ul>
          </div>
        </div>
        <p className="text-mono mb-6 text-gray-500"></p>
        <span className="mx-auto font-mono text-sm text-gray-500">
          © {new Date().getFullYear() + " "}
          <Link
            href="https://github.com/denitdao"
            className="decoration-blue-400 decoration-2 hover:underline"
          >
            DenITDao
          </Link>
        </span>
      </div>
    </footer>
  );
};

export default OrlyFooter;
