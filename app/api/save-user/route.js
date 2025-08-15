// app/api/save-user/route.js
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

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



export async function PUT(request) {
  try {
    const { clerkId, courseId } = await request.json();

    console.log(clerkId)
    console.log(courseId)

    if (!clerkId || !courseId) {
      return NextResponse.json({ error: "Missing clerkId or courseId" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("inspira");

    const user = await db.collection("user").findOne({ clerkId: clerkId.trim() });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Only convert to ObjectId if it is a valid 24-character hex string
    let courseObjectId;
    if (ObjectId.isValid(courseId)) {
      courseObjectId = new ObjectId(courseId);
    } else {
      return NextResponse.json({ error: "Invalid courseId" }, { status: 400 });
    }

    const result = await db.collection("user").updateOne(
      { clerkId: clerkId.trim() },
      { $addToSet: { enrolledCourses: courseObjectId } } // add courseId safely
    );

    return NextResponse.json({ message: "Course added to user successfully!" });
  } catch (error) {
    console.error("PUT /api/save-user error:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
