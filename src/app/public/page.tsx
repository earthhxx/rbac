// app/public/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to RBAC Enterprise App</h1>
      <p className="text-lg text-gray-700 mb-6">
        This is the Home page. Navigate to explore the dashboard and features.
      </p>
      <div className="space-x-4">
        <Link
          href="/public/about"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          About
        </Link>
        <Link
          href="/dashboard"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Dashboard
        </Link>
      </div>
    </main>
  );
}
