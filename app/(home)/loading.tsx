export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-12 animate-pulse">
      <section
        aria-label="Loading portfolio"
        className="py-12 text-center"
      >
        <div className="mx-auto mb-4 h-10 w-64 rounded bg-gray-200" />
        <div className="mx-auto h-6 max-w-2xl rounded bg-gray-200" />
      </section>

      <section
        aria-label="Loading projects"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {[1, 2, 3].map((project) => (
          <div key={project} className="rounded-lg border p-6">
            <div className="mb-4 h-6 w-2/3 rounded bg-gray-200" />
            <div className="mb-2 h-4 rounded bg-gray-200" />
            <div className="mb-4 h-4 w-4/5 rounded bg-gray-200" />
            <div className="h-4 w-1/3 rounded bg-gray-200" />
          </div>
        ))}
      </section>
    </main>
  );
}