import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const resume = formData.get("resume") as File;
    const jsonData = formData.get("data");

    if (!jsonData) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const data = JSON.parse(jsonData as string);

    // save data here, instead log it
    console.log("Received form ", data);
    console.log("Received resume:", resume.name, resume.type, resume.size);

    return NextResponse.json(
      { message: "Successfully submitted" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
