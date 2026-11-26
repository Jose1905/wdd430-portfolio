import { ProjectSearch } from "@/components/ProjectSearch";
import ProjectList from "@/components/ProjectList";
import Pagination from "@/components/Pagination";
import { fetchFilteredProjects, fetchProjectsPages } from "@/lib/projects-db";
import { Suspense } from "react";
import Link from "next/link";
import { auth } from '@/auth';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects dashboard',
};

type ProjectsPageProps = {
  searchParams: Promise<{
    query?: string | string[];
    page?: string | string[];
  }>;
};

async function ProjectsResults({ searchParams }: ProjectsPageProps) {
  const params = await searchParams;
  const query = typeof params.query === "string" ? params.query : "";
  const requestedPage = Number.parseInt(
    typeof params.page === "string" ? params.page : "1",
    10,
  );
  const currentPage =
    Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
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

async function DashboardWelcome() {
  const session = await auth();

  return <p>Welcome, {session?.user?.email}!</p>;
}

export default function DashboardPage({ searchParams }: ProjectsPageProps) {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center py-12">
        <Suspense
          fallback={
            <div
              aria-label="Loading account"
              className="mx-auto mb-2 h-5 w-48 animate-pulse rounded bg-slate-200"
            />
          }
        >
          <DashboardWelcome />
        </Suspense>
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
      <div className="mt-6">
        <Link
          href="/projects/create"
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          New Project
        </Link>
      </div>
    </main>
  );
}