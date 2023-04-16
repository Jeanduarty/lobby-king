import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: any) {
  const requestMethod = req.method;
  const id = Number(params.id);

  if (requestMethod === 'GET') {
    try {
      const isExist = await prisma.match.findUniqueOrThrow({
        where: {
          match_id: id
        }
      })
      return NextResponse.json(isExist, { status: 200 })
    } catch (error) {
    }
    return NextResponse.json(null)
  }

  return new Response("METHOD NOT ALLOWED", { status: 405 })
}
