import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { z } from "zod";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const requestMethod = req.method;

  if (requestMethod === 'GET') {
    try {
      const matches = await prisma.match.findMany({
        select: {
          match_id: true,
          winner: true,
          date: true,
          radiant_win: true,
        },
        orderBy: {
          date: "desc"
        }
      });
      return NextResponse.json(matches, { status: 200 })

    } catch (error) {
      return console.log(error);
    }
  }

  return new Response("METHOD NOT ALLOWED", { status: 405 })
}

export async function POST(req: NextRequest, res: any) {
  const requestMethod = req.method;

  if (requestMethod === 'POST') {
    const body = await req.json();

    const createMatchSchema = z.object({
      match_id: z.number(),
      winner: z.string(),
      date: z.number(),
      radiant_win: z.boolean()
    })
    const { match_id, winner, date, radiant_win } = createMatchSchema.parse(body);

    try {
      const isExist = await prisma.match.findUnique({
        where: {
          match_id
        }
      })

      if (!!isExist) {
        console.log("Match already registered!");
        return new Response("Match already registered!", { status: 400 })
      }

      await prisma.match.create({
        data: {
          match_id,
          winner,
          date,
          radiant_win
        }
      });

      console.log("successfully created!");

      // await res.revalidate("/")

      return new Response("successfully created!", { status: 201 });
    } catch (error) {
      console.log(error);
    }

    return new Response("FAILED TO CREATED!", { status: 400 })
  }

  return new Response("METHOD NOT ALLOWED", { status: 405 })
}

