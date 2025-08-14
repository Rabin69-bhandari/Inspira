// app/api/save-user/route.js
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  const { clerkId, fullName, imageUrl,email } = await request.json();
  const client = await clientPromise;
  const db = client.db("inspira"); // database selected here

  await db.collection("user").updateOne(
    { clerkId },
    { $set: { fullName, imageUrl, clerkId,email } },
    { upsert: true }
  );

  return NextResponse.json({ message: "User saved" });
}
