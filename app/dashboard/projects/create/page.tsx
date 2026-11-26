import { Suspense } from 'react'
import { connection } from 'next/server'
import CreateProjectForm from '@/components/create-project-form'

async function DynamicCreateProjectForm() {
    await connection()
    const currentYear = new Date().getFullYear()

    return <CreateProjectForm currentYear={currentYear} />
}

export default function Page() {
    return (
        <main className="mx-auto max-w-xl px-4 py-12">
            <h1 className="mb-6 text-3xl font-bold text-gray-900">Create Project</h1>
            <Suspense fallback={<p role="status">Loading project form...</p>}>
                <DynamicCreateProjectForm />
            </Suspense>
        </main>
    )
}