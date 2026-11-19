'use server'

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const ProjectFormSchema = z.object({
    title: z.string().min(2),
    description: z.string().min(10),
    technologies: z.string().min(2)
        .transform((value) => value.split(',').map((technology) => technology.trim()).filter(Boolean))
        .refine((technologies) => technologies.length > 0, {
            message: 'At least one technology is required.'
        })
});

export async function deleteProject(id: number) {
    await sql`DELETE FROM projects WHERE id = ${id}`;
    revalidatePath('/projects');
}

export async function createProject(formData: FormData) {
    const raw = {
        title: formData.get('title'),
        description: formData.get('description'),
        technologies: formData.get('technologies')
    };

    const parsed = ProjectFormSchema.safeParse(raw);
    if (!parsed.success) {
        throw new Error('Invalid project input.');
    }

    const { title, description, technologies } = parsed.data;

    await sql`
        INSERT INTO projects (title, description, technologies)
        VALUES (${title}, ${description}, string_to_array(${technologies.join(',')}, ','))
    `;

    revalidatePath('/projects');
    redirect('/projects');
}

export async function updateProject(id: number, formData: FormData) {  
    const raw = {
        title: formData.get('title'),
        description: formData.get('description'),
        technologies: formData.get('technologies')
    };

    const parsed = ProjectFormSchema.safeParse(raw);
    if (!parsed.success) {
        throw new Error('Invalid project input.');
    }

    const { title, description, technologies } = parsed.data;

    await sql`
        UPDATE projects
        SET title = ${title}, description = ${description}, technologies = string_to_array(${technologies.join(',')}, ',')
        WHERE id = ${id}
    `;

    revalidatePath('/projects');
    redirect('/projects');
}