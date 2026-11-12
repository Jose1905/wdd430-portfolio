import ProjectList from '@/components/ProjectList';
import { getProjects } from '@/lib/projects-db';

async function loadAllProjects() {
  try {
    return { projects: await getProjects(), error: false };
  } catch {
    return { projects: [], error: true };
  }
}

export default async function AllProjectList() {
  const { projects, error } = await loadAllProjects();

  if (error) return <p role="alert">Could not load projects.</p>;

  return <ProjectList projects={projects} />;
}