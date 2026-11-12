import OpensourceProjectList from '@/components/OpensourceProjectList';
import Loading from '@/app/projects/opensource/loading';
import { Suspense } from 'react';

export default function OpensourceProjects() {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Opensource Projects</h1>
      </section>

      <Suspense fallback={<Loading />}>
        <OpensourceProjectList />
      </Suspense>
    </main>
  );
}