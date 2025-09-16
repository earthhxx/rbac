import { ReactNode } from "react";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="fixed w-full bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="text-xl font-bold">Dashboard</div>
        <div className="space-x-4">
          <Link href="/dashboard" className="hover:bg-gray-700 px-3 py-2 rounded">
            Home
          </Link>
          <Link href="/dashboard/users" className="hover:bg-gray-700 px-3 py-2 rounded">
            Users
          </Link>
          <Link href="/dashboard/roles" className="hover:bg-gray-700 px-3 py-2 rounded">
            Roles
          </Link>
          <Link href="/dashboard/reports" className="hover:bg-gray-700 px-3 py-2 rounded">
            Reports
          </Link>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
}
