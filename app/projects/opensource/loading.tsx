export default function Loading() {
  return (
    <main className="container mx-auto animate-pulse px-4 py-12">
      <header className="mb-10">
        <div className="mb-4 h-9 w-64 rounded bg-gray-200" />
        <div className="h-5 max-w-2xl rounded bg-gray-200" />
      </header>

      <section
        aria-label="Loading open-source projects"
        className="space-y-4"
      >
        {[1, 2, 3].map((item) => (
          <article
            key={item}
            className="rounded-lg border p-6 sm:flex sm:items-center sm:justify-between"
          >
            <div className="mb-4 sm:mb-0">
              <div className="mb-3 h-6 w-56 rounded bg-gray-200" />
              <div className="h-4 max-w-xl rounded bg-gray-200" />
            </div>
            <div className="h-8 w-24 rounded bg-gray-200" />
          </article>
        ))}
      </section>
    </main>
  );
}