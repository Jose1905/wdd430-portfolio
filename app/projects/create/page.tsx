import CreateProjectForm from '@/app/projects/create/create-project-form'

export default function Page() {
    return (
        <main className="mx-auto max-w-xl px-4 py-12">
            <h1 className="mb-6 text-3xl font-bold text-gray-900">Create Project</h1>
            <CreateProjectForm />
        </main>
    )
}