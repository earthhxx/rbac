// /pages/api/userroletable/deleterolepermission.ts
import { NextRequest, NextResponse } from "next/server";
import { getsqlserverConnection } from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        const { RoleID, PermissionID } = await req.json();

        if (!RoleID || !PermissionID) {
            return NextResponse.json(
                { error: "กรุณากรอก RoleID และ PermissionID" },
                { status: 400 }
            );
        }

        const pool = await getsqlserverConnection();

        await pool.request()
            .input("RoleID", RoleID)
            .input("PermissionID", PermissionID)
            .query(`
                DELETE FROM [dbo].[RolePermissions]
                WHERE RoleID = @RoleID AND PermissionID = @PermissionID
            `);

        const result = await pool.request().query(`
            SELECT RoleID, PermissionID FROM [dbo].[RolePermissions]
        `);

        return NextResponse.json(result.recordset);

    } catch (error) {
        console.error("Delete role-permission error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
