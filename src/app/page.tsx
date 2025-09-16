// app/page.tsx
import { redirect } from "next/navigation";

export default function RootPage() {
  // ถ้าอยากให้ root ไปหน้า public/home
  redirect("/public");
}
