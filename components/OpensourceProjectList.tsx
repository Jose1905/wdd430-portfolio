import ProjectList from '@/components/ProjectList';
import { getProjects } from '@/lib/projects-db';

async function loadOpensourceProjects() {
  try {
    return { projects: await getProjects('opensource'), error: false };
  } catch {
    return { projects: [], error: true };
  }
}

export default async function OpensourceProjectList() {
  const { projects, error } = await loadOpensourceProjects();

  if (error) return <p role="alert">Could not load opensource projects.</p>;

  return <ProjectList projects={projects} />;
}