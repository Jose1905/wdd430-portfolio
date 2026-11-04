import ProjectList from '@/components/ProjectList';
const projects = [
  {
    title: 'Service Project management website',
    description: 'A web backend project for managing service projects.',
    technologies: ['JavaScript', 'CSS', 'Node.js', 'Express.js', 'PostgreSQL'],
    link: 'https://github.com/Jose1905/cse340-course-repo'
  },
  {
    title: 'Pokemon data analysis',
    description: 'A basic demonstration of how to analyze data using R.',
    technologies: ['R'],
    link: 'https://github.com/your-username/project2'
  }
];

export default function Home() { 
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">My Portfolio</h1>
        <p className="text-lg text-gray-700">
          I'm a full-stack developer learning Next.js and React. Here are some of my recent projects.
        </p>
      </section>
      <ProjectList projects={projects} />
    </main>
  );
}