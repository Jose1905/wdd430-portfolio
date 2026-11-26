"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect, notFound } from "next/navigation";
import { getProjectById } from "./projects-db";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { auth } from "@/auth";

function getCreateProjectSchema() {
  const currentYear = new Date().getFullYear();

  return z.object({
    title: z.string().min(3, "Title must be at least 3 characters."),
    description: z
      .string()
      .min(20, "Description must be at least 20 characters."),
    technologies: z.string().min(2, "Add at least one technology."),
    link: z
      .union([z.string().url("Link must be a valid URL."), z.literal("")])
      .nullable(),
    year_completed: z.coerce
      .number()
      .int("Year must be a whole number.")
      .gte(2000, "Year must be 2000 or later.")
      .lte(currentYear, `Year cannot be greater than ${currentYear}`),
  });
}

export type State = {
  errors?: {
    title?: string[];
    description?: string[];
    technologies?: string[];
    link?: string[];
    year_completed?: string[];
  };
  message?: string | null;
};

async function requireOwnerSession() {
  const session = await auth();
  if (!session?.user) throw new Error('Not authenticated');
  return session;
}

export async function createProject(_prevState: State, formData: FormData): Promise<State> {
  await requireOwnerSession();

  const validatedFields = getCreateProjectSchema().safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    technologies: formData.get('technologies'),
    link: formData.get('link') || null,
    year_completed: formData.get('year_completed')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to create project'
    };
  }

  const { title, description, technologies, link, year_completed } = validatedFields.data;

  try {
    await sql`
      INSERT INTO projects (title, description, technologies, link, year_completed)
      VALUES (
        ${title},
        ${description},
        ARRAY(
          SELECT btrim(value)
          FROM unnest(string_to_array(${technologies}, ',')) AS tech(value)
          WHERE btrim(value) <> ''
        ),
        ${link},
        ${year_completed}
      )
    `;
  } catch (error) {
    return {
      message: `Database Error: Failed to create project. Error: ${error instanceof Error ? error.message : String(error)}`
    };
  }

  revalidatePath('/dashboard/projects');
  redirect('/dashboard/projects');
}

export async function updateProject(id: number, formData: FormData) {
  await requireOwnerSession();
  
  const raw = {
    title: formData.get("title"),
    description: formData.get("description"),
    technologies: formData.get("technologies"),
    link: formData.get("link"),
    year_completed: formData.get("year_completed"),
  };

  const project = await getProjectById(id);
  if (!project) {
    notFound();
  }

  const parsed = getCreateProjectSchema().safeParse(raw);
  if (!parsed.success) {
    throw new Error("Invalid project input.");
  }

  const { title, description, technologies, link, year_completed } = parsed.data;

  console.log(`title: ${title}, description: ${description}, technologies: ${technologies}, link: ${link}, year_completed: ${year_completed}`);

  await sql`
        UPDATE projects
        SET title = ${title}, description = ${description}, technologies = ARRAY(
              SELECT btrim(value)
              FROM unnest(string_to_array(${technologies}, ',')) AS tech(value)
              WHERE btrim(value) <> ''
            ),
            link = ${link || null}, year_completed = ${year_completed}
        WHERE id = ${id}
    `;

  revalidatePath("/dashboard/projects");
  redirect("/projects");
}

export async function deleteProject(id: number) {
  await requireOwnerSession();
  
  try {
    await sql`DELETE FROM projects WHERE id = ${id}`;
    revalidatePath("/dashboard/projects");
  } catch (error) {
    console.error("Error deleting project:", error);
    throw new Error("Failed to delete project. Please try again later.");
  }
  revalidatePath("/dashboard/projects");
  redirect("/dashboard/projects");
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirectTo: '/dashboard/projects',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid email or password.';
        default:
          return 'Something went wrong.';
      }
    }

    throw error; //re-throw so Next.js handles redirects correctly
  }
}