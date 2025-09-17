// /pages/api/permissions
import {  NextResponse } from "next/server";
import { getsqlserverConnection } from "@/lib/db";

export async function GET() {
  try {
    const pool = await getsqlserverConnection();

    const Result = await pool.request().query(`
      SELECT [PermissionID], [PermissionName], [Description]
      FROM [dbo].[Permissions]
    `);

    if (Result.recordset.length === 0) {
      return NextResponse.json({ error: "ไม่พบข้อมูล" }, { status: 404 });
    }
    // ✅ ส่งข้อมูลกลับ
    return NextResponse.json({ data: Result.recordset }); // แก้ตรงนี้

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
