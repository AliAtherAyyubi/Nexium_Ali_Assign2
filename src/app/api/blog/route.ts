import { connectToDB } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const db = await connectToDB();
        if (!db) {
            return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
        }
        const collections = await db.listCollections().toArray();
        return NextResponse.json(collections);
    } catch (error) {
        console.error("Error fetching collections:", error);
        return NextResponse.json({ error: "Failed to fetch collections" }, { status: 500 });
    }
}


export async function POST(req: Request) {
  try {
    const body = await req.json();
    // console.log(body)
    let result;
    let db = await connectToDB();
    if (db){
        let collection = db.collection("summary");
        result = await collection.insertOne(body);
    }

    return NextResponse.json({ success: true, id:result?.insertedId });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}