import type { Metadata } from "next";
import { Geist, Geist_Mono, Kanit } from "next/font/google";
import "./globals.css";
import { User } from "@/types/cookies";
import { cookies } from "next/headers"; // สำหรับ SSR cookie
import { jwtVerify } from "jose";
import { AuthProvider } from "./context/AuthContext";
import Sidebar from "@/components/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "RBAC",
  description: "ROLE BASE ACCESS",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // --- SSR: อ่าน cookie ---
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  let initialUser: User | null = null;
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      const { payload } = await jwtVerify(token, secret);

      initialUser = {
        userId: payload.userId as string,
        fullName: payload.fullName as string,
        roles: Array.isArray(payload.roles)
          ? payload.roles
          : [payload.roles as string],
        permissions: Array.isArray(payload.permissions)
          ? payload.permissions
          : [payload.permissions as string],
        ForgetPass: payload.ForgetPass as string,
      };
      console.log('ini', initialUser)
    } catch {
      initialUser = null;
    }
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${kanit.variable} antialiased`}
      >
        <AuthProvider initialUser={initialUser}>
          <Sidebar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
