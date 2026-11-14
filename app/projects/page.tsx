import { ProjectSearch } from '@/components/ProjectSearch';
import ProjectList from '@/components/ProjectList';
import Pagination from '@/components/Pagination';
import { fetchFilteredProjects, fetchProjectsPages } from '@/lib/projects-db';
import { Suspense } from 'react';

type ProjectsPageProps = {
  searchParams: Promise<{
    query?: string | string[];
    page?: string | string[];
  }>;
};

async function ProjectsResults({ searchParams }: ProjectsPageProps) {
  const params = await searchParams;
  const query = typeof params.query === 'string' ? params.query : '';
  const requestedPage = Number.parseInt(
    typeof params.page === 'string' ? params.page : '1',
    10,
  );
  const currentPage = Number.isFinite(requestedPage) && requestedPage > 0
    ? requestedPage
    : 1;
  const [projects, totalPages] = await Promise.all([
    fetchFilteredProjects(query, currentPage),
    fetchProjectsPages(query),
  ]);

  return (
    <>
      <ProjectList projects={projects} />
      <Pagination totalPages={totalPages} />
    </>
  );
}

export default function ProjectsPage({ searchParams }: ProjectsPageProps) {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Projects Overview</h1>
        <Suspense fallback={<div className="h-10" aria-hidden="true" />}>
          <ProjectSearch />
        </Suspense>
      </section>

      <section>
        <Suspense fallback={<p role="status">Loading projects...</p>}>
          <ProjectsResults searchParams={searchParams} />
        </Suspense>
      </section>
    </main>
  );
}