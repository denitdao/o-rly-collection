import OrlyFooter from "~/components/OrlyFooter";
import OrlyHead from "~/components/meta/OrlyHead";
import Link from "next/link";

export default function MetricsPage() {
  return (
    <>
      <OrlyHead title="Site Metrics | O'RLY Covers" />
      <div className="flex min-h-screen flex-col bg-gray-50">
        <header className="mx-auto flex w-full max-w-screen-2xl flex-col items-center px-4 pb-7 pt-4 text-center">
          <Link
            href="/"
            className="flex min-w-[min(100%,800px)] gap-4 pb-3 font-mono text-base font-normal text-gray-600 underline decoration-blue-400 decoration-2 underline-offset-2"
          >
            &lt;- Back to covers
          </Link>
          <h1 className="text-4xl font-extrabold text-black">Site Metrics</h1>
          <p className="mt-3 font-mono text-sm text-gray-600">
            Public PostHog dashboard (pageviews and usage trends)
          </p>
        </header>
        <main className="flex-1 px-4 pb-16">
          <div className="mx-auto w-full max-w-screen-2xl">
            <div className="mx-auto max-w-4xl overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <iframe
                width="100%"
                height="800"
                allowFullScreen
                src="https://eu.posthog.com/embedded/ZJXnsk_lyUf-LSAAMa1CtrErbd6p4Q"
                key="0"
              ></iframe>
            </div>
          </div>
        </main>
        <OrlyFooter />
      </div>
      <div style={{ height: 0.5 }}></div>
    </>
  );
}
