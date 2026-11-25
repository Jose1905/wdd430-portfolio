export default function Loading() {
  return (
    <main className="container mx-auto animate-pulse px-4 py-12">
      <article aria-label="Loading project">
        <div className="mb-4 h-9 w-56 rounded bg-gray-200" />
        <div className="mb-2 h-5 max-w-2xl rounded bg-gray-200" />
        <div className="h-5 max-w-xl rounded bg-gray-200" />
      </article>
    </main>
  );
}