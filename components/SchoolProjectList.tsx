import ProjectList from '@/components/ProjectList';
import { getProjects } from '@/lib/projects-db';

async function loadSchoolProjects() {
  try {
    return { projects: await getProjects('school'), error: false };
  } catch {
    return { projects: [], error: true };
  }
}

export default async function SchoolProjectList() {
  const { projects, error } = await loadSchoolProjects();

  if (error) return <p role="alert">Could not load school projects.</p>;

  return <ProjectList projects={projects} />;
}