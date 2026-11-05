'use client';

import ProjectList from '@/components/ProjectList';
import type { Project } from '@/lib/projects-db';
import { useEffect, useState } from 'react';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/projects')
    .then((response) => {
      if (!response.ok) throw new Error('could not load projects');
      return response.json();
    })
    .then((data) => setProjects(data.projectList))
    .catch((err: Error) => setError(err.message));
  }, []);

  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Projects Overview</h1>
        {error && <p role="alert">{error}</p>}
      </section>
      
      <section>
        <ProjectList projects={projects} />
      </section>
    </main>
  );
}