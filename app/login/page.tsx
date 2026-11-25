import { LoginForm } from '@/components/login-form';

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-md items-center justify-center px-4 py-12">
      <section className="w-full rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="mb-6 text-3xl font-bold text-slate-900">Sign In</h1>
        <LoginForm />
      </section>
    </main>
  );
}