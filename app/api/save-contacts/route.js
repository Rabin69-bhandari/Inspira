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


export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("inspira");

    const contacts = await db
      .collection("contact")
      .find({})
      .sort({ createdAt: -1 }) // newest first
      .toArray();

    return NextResponse.json(contacts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}