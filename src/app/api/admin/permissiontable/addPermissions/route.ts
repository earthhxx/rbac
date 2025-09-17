
import { NextRequest, NextResponse } from "next/server";
import { getsqlserverConnection } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const pool = await getsqlserverConnection();

    // Insert
    await pool.request()
      .input("PermissionName", body.PermissionName)
      .input("Description", body.Description)
      .query(`
        INSERT INTO [dbo].[Permissions] (PermissionName, Description)
        VALUES (@PermissionName, @Description);
      `);

    // ดึงข้อมูลทั้งหมดหลัง insert
    const allPermissions = await pool.request().query(`
      SELECT PermissionID, PermissionName, Description
      FROM [dbo].[Permissions]
    `);

    return NextResponse.json(allPermissions.recordset);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
