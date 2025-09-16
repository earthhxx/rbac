// app/public/about/page.tsx
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-4">About This Project</h1>
      <p className="text-lg text-gray-700 mb-6 max-w-xl text-center">
        This is a sample RBAC (Role-Based Access Control) enterprise application built
        with Next.js 13, App Router, and Tailwind CSS. It demonstrates a modular
        architecture with dashboard, CRUD features, and middleware-based auth.
      </p>
      <Link
        href="/public"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </main>
  );
}
