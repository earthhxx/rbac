"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

export default function Sidebar() {
    const { user, logout, open, setOpen } = useAuth();
    const [mounted, setMounted] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => setMounted(true), []);

    const roles = user?.roles || [];
    const permission = user?.permissions || [];
    const userId = user?.userId || "";
    const fullName = user?.fullName || "";

    const handleClickOutside = (e: MouseEvent) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        if (open) document.addEventListener("mousedown", handleClickOutside);
        else document.removeEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    useEffect(() => {
        if (!user) setOpen(false);
    }, [user]);

    if (!mounted) return null;

    return (
        <>
            {!open && user && (
                <button
                    onClick={() => setOpen(true)}
                    className="fixed top-4 left-4 z-49 p-2 bg-white text-black rounded shadow-md"
                >
                    ☰ MENU
                </button>
            )}

            <div
                className={`fixed inset-0 z-40 bg-white/10 backdrop-blur-[4px] transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
            ></div>

            <aside
                ref={sidebarRef}
                className={`fixed h-screen w-74 bg-gray-900 text-white z-50 transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="relative w-full h-full flex flex-col justify-center items-center">

                    {user && (
                        <>
                            <div className="p-6 text-center">
                                <p className="text-lg font-semibold">Welcome</p>
                                <p className="text-lg">{fullName || userId}</p>
                            </div>

                            <nav className="flex flex-col gap-3 p-6 flex-1 w-full">
                                <Link
                                    href="/"
                                    onClick={() => setOpen(false)}
                                    className="hover:bg-gray-700 bg-gray-700/30 p-3 rounded font-medium text-center"
                                >
                                    หน้าหลัก
                                </Link>

                                {roles?.includes("Admin") && (
                                    <Link
                                        href="/pages/admin"
                                        onClick={() => setOpen(false)}
                                        className="hover:bg-green-700 bg-green-700/30 p-3 rounded font-medium text-green-400 text-center"
                                    >
                                        Admin Panel
                                    </Link>
                                )}

                                {permission?.includes("D_Approve") && (
                                    <Link
                                        href="/pages/Userlogin/D-APPROVE"
                                        onClick={() => setOpen(false)}
                                        className="hover:bg-red-700 bg-red-700/20 p-3 rounded font-medium text-red-400 text-center"
                                    >
                                        ระบบอนุมัติอิเล็กทรอนิกส์
                                    </Link>
                                )}
                            </nav>

                            <div className="px-6 pt-4 pb-2 border-t border-gray-700 text-gray-400 text-sm space-y-1">
                                <div>
                                    <span className="font-semibold">Roles:</span> {roles.join(", ")}
                                </div>
                                <div>
                                    <span className="font-semibold">User ID:</span> {userId}
                                </div>
                                <div>
                                    <span className="font-semibold">Full Name:</span> {fullName}
                                </div>
                            </div>

                            <button
                                onClick={logout}
                                className="mt-2 w-[80%] bg-red-600 hover:bg-red-700 px-8 py-2 font-semibold rounded-sm mb-4"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </aside>
        </>
    );
}
