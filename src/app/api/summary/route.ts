import { NextResponse } from "next/server";
// import {supabase}
import { createClient } from "../../../../utils/supabase/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const cookiesStore= cookies();
    const supabase= createClient(cookiesStore);

    const body = await req.json();
    // console.log(body);
    // supabase command to insert data
    const { data, error } = await supabase
      .from("Summary")
      .insert([
        {
          summary: body.summary,
          urdu: body.urdu,
          }
      ])
      .select();

      console.log(error);
    return NextResponse.json({ success: true, data: data }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}