import { Suspense } from "react";
import { updateProject } from "@/lib/actions";
import { getProjectById } from "@/lib/projects-db";
import { notFound } from "next/navigation";

type EditPageProps = { params: Promise<{ id: string }> };

async function EditProjectForm({ params }: EditPageProps) {
  const { id: routeId } = await params;
  const id = Number(routeId);
  if (!Number.isSafeInteger(id) || id < 1) {
    notFound();
  }

  const project = await getProjectById(id);
  if (!project) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Edit Project</h1>
      <form action={updateProject.bind(null, id)} className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            id="title"
            name="title"
            required
            defaultValue={project.title}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            rows={5}
            required
            defaultValue={project.description}
            className="w-full resize-y rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="technologies" className="block text-sm font-medium text-gray-700">Technologies (comma-separated)</label>
          <input
            id="technologies"
            name="technologies"
            required
            defaultValue={project.technologies.join(", ")}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Save Project
        </button>
      </form>
    </main>
  );
}

export default function Page({ params }: EditPageProps) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-xl px-4 py-12">
          <p role="status">Loading project form...</p>
        </main>
      }
    >
      <EditProjectForm params={params} />
    </Suspense>
  );
}
