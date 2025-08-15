// app/api/admin-course/route.js
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET: Fetch all courses
export async function GET() {
  const client = await clientPromise;
  const db = client.db("inspira");

  const courses = await db.collection("courses").find({}).toArray();
  return NextResponse.json(courses);
}

// POST: Create a new course
export async function POST(request) {
  const client = await clientPromise;
  const db = client.db("inspira");

  const data = await request.json(); // expects JSON like { title: "...", description: "..." }

  console.log(data)

  const result = await db.collection("courses").insertOne(data);
  return NextResponse.json({ message: "Course created", id: result.insertedId });
}

// PUT: Update a course
export async function PUT(request) {
  const client = await clientPromise;
  const db = client.db("inspira");

  const { id, update } = await request.json(); 
  console.log(id)
  // expects JSON like { id: "course_id_here", update: { title: "...", description: "..." } }

  const result = await db
    .collection("courses")
    .updateOne({ _id: new ObjectId(id) }, { $set: update });

  if (result.matchedCount === 0) {
    return NextResponse.json({ message: "Course not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Course updated" });
}

// DELETE: Delete a course
export async function DELETE(request) {
  const client = await clientPromise;
  const db = client.db("inspira");

  const { id } = await request.json(); // expects JSON like { id: "course_id_here" }

  const result = await db.collection("courses").deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 0) {
    return NextResponse.json({ message: "Course not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Course deleted" });
}


