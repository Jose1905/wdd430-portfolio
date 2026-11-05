import { NextResponse } from 'next/server';
import { getProjectById } from '@/lib/projects-db';

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: rawId } = await params;
    const id = Number(rawId);
    const project = getProjectById(id);

    if (!Number.isInteger(id) || id <= 0) {
        return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    if (!project) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ project });
}