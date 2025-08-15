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

export async function PUT(request) {
  try {
    const { userId, courseId } = await request.json();

    const client = await clientPromise;
    const db = client.db("inspira");

    // Update user by adding courseId to enrolledCourses array
    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      { $addToSet: { enrolledCourses: new ObjectId(courseId) } } // prevents duplicates
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Course added to user successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
