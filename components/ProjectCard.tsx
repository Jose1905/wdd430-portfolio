import Link from "next/link";
import { deleteProject } from "@/lib/actions";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export default function ProjectCard({
  id,
  title,
  description
}: ProjectCardProps) {
  return (
    <article className="p-4 border-l-4 border-blue-600 bg-gray-100 rounded">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-700 mb-3">{description}</p>
      <Link
          href={`/projects/${id}`}
          className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
        >
          View Details
        </Link>
    </article>
  );
}
