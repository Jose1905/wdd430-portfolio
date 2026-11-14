import { ProjectSearch } from "./ProjectSearch";
import ProjectList from "./ProjectList";
import { fetchFilteredProjects } from "@/lib/projects-db";

export default async function ProjectsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const requestedPage = Number.parseInt(searchParams?.page || '1', 10);
  const currentPage = Number.isFinite(requestedPage) && requestedPage > 0
    ? requestedPage
    : 1;

  const projects = await fetchFilteredProjects(query, currentPage);

  return (
    <div>
      <ProjectSearch />
      <ProjectList projects={projects} />
    </div>
  );
}