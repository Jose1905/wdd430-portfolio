import { getProjectById } from "@/lib/projects-db";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";
import { deleteProject } from "@/lib/actions";
import { Metadata } from "next";

type EditPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: EditPageProps): Promise<Metadata> {
  const { id: routeId } = await params;
  const id = Number(routeId);

  if (!Number.isSafeInteger(id) || id < 1) {
    return {
      title: 'Project Not Found',
      description: 'The requested portfolio project could not be found.',
    };
  }

  const project = await getProjectById(id);

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested portfolio project could not be found.',
    };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projectId = Number(id);
  if (!Number.isSafeInteger(projectId) || projectId < 1) notFound();

  const session = await auth();
  const project = await getProjectById(projectId);
  if (!project) notFound();

  return (
    <main className="container mx-auto max-w-3xl px-4 py-12">
      <article className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-slate-900">{project.title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-7 text-slate-700">
            {project.description}
          </p>
        </header>

        <p className="border-t border-slate-200 pt-5 text-sm text-slate-600">
          <strong className="font-semibold text-slate-900">Technologies:</strong>{" "}
          {project.technologies.join(", ")}
        </p>
        {project.link && (
          <p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-700 hover:text-blue-800 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              View Project
            </a>
          </p>
        )}

        {session && (
          <div className="flex flex-wrap gap-3 border-t border-slate-200 pt-5">
            <Link
              href={`/dashboard/projects/${project.id}/edit`}
              className="rounded-md bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              Edit
            </Link>
            <form action={deleteProject.bind(null, project.id)}>
              <button
                type="submit"
                className="rounded-md bg-red-700 px-4 py-2 font-semibold text-white hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
              >
                Delete
              </button>
            </form>
          </div>
        )}
      </article>
    </main>
  );
}
