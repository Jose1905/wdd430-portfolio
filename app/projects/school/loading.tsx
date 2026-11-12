export default function Loading() {
  return (
    <main className="container mx-auto animate-pulse px-4 py-12">
      <header className="mb-10">
        <div className="mb-4 h-9 w-56 rounded bg-gray-200" />
        <div className="h-5 max-w-2xl rounded bg-gray-200" />
      </header>

      <section
        aria-label="Loading school projects"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {[1, 2, 3].map((item) => (
          <article key={item} className="rounded-lg border p-6">
            <div className="mb-4 h-40 rounded bg-gray-200" />
            <div className="mb-3 h-6 w-2/3 rounded bg-gray-200" />
            <div className="mb-2 h-4 rounded bg-gray-200" />
            <div className="mb-4 h-4 w-4/5 rounded bg-gray-200" />
            <div className="h-4 w-1/3 rounded bg-gray-200" />
          </article>
        ))}
      </section>
    </main>
  );
}