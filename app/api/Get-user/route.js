// app/api/save-user/route.js
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";


export async function GET() {
  const client = await clientPromise;
  const db = client.db("inspira");

  const users = await db.collection("user").find({}).toArray();

  return NextResponse.json(users);
}
