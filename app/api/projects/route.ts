import { NextResponse } from 'next/server';
import { getProjects } from '@/lib/projects-db'

export async function GET(request: Request) {
    const type = new URL(request.url).searchParams.get('type');
    const projectList = getProjects(type);

    return NextResponse.json({ projectList });
}