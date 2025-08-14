// app/api/save-contact/route.js
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  const { name, email, message } = await request.json();
  const client = await clientPromise;
  const db = client.db("inspira"); // database name

  await db.collection("contact").insertOne({
    name,
    email,
    message,
    createdAt: new Date(),
  });

  return NextResponse.json({ message: "Contact saved successfully" });
}
