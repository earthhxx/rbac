// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ตัวอย่าง token + role จาก cookie
export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value; // ex: "admin", "user"

  const url = req.nextUrl.clone();

  // ถ้าเข้าหน้า dashboard แต่ไม่มี token → login
//   if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
//     url.pathname = "/login";
//     return NextResponse.redirect(url);
//   }

//   // RBAC ตัวอย่าง: user ไม่มีสิทธิ์เข้าหน้า roles
//   if (role !== "admin" && req.nextUrl.pathname.startsWith("/dashboard/roles")) {
//     url.pathname = "/dashboard"; // redirect ไป dashboard home
//     return NextResponse.redirect(url);
//   }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // middleware apply ทุกหน้า dashboard
};
