import SchoolProjectList from '@/components/SchoolProjectList';
import Loading from '@/app/projects/school/loading';
import { Suspense } from 'react';

export default function SchoolProjects() {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">School Projects</h1>
      </section>

      <Suspense fallback={<Loading />}>
        <SchoolProjectList />
      </Suspense>
    </main>
  );
}