import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const clerkId = searchParams.get("clerkId"); // frontend sends ?clerkId=xxxx


    if (!clerkId) {
      return NextResponse.json({ error: "Missing clerkId" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("inspira");

    // Find the user by clerkId
    const user = await db.collection("user").findOne({ clerkId: clerkId.trim() });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get enrolledCourses array
    const enrolledCourseIds = (user.enrolledCourses || []).map(id => new ObjectId(id));

    if (enrolledCourseIds.length === 0) {
      return NextResponse.json({ courses: [] });
    }

    // Fetch course details from course collection
    const courses = await db.collection("courses")
      .find({ _id: { $in: enrolledCourseIds } })
      .toArray();

    return NextResponse.json({ courses });
  } catch (error) {
    console.error("GET /api/user-courses error:", error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}
