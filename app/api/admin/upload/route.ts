import { NextRequest } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folderName = (formData.get("folder") as string) || "cars";
    const targetFolder = ["cars", "destinations"].includes(folderName) ? folderName : "cars";

    if (!file) {
      return Response.json({ error: "File tidak ditemukan" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    if (!allowedTypes.includes(file.type)) {
      return Response.json(
        { error: "Format file tidak didukung. Gunakan JPG, PNG, atau WebP." },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return Response.json(
        { error: "Ukuran file maksimal 5MB" },
        { status: 400 }
      );
    }

    // Generate unique filename
    const ext = file.name.split(".").pop() || "jpg";
    const timestamp = Date.now();
    const safeName = file.name
      .replace(/\.[^/.]+$/, "") // remove extension
      .replace(/[^a-zA-Z0-9-_]/g, "-") // sanitize
      .toLowerCase();
    const filename = `${safeName}-${timestamp}.${ext}`;

    // Ensure directory exists
    const uploadDir = path.join(process.cwd(), "public", targetFolder);
    await mkdir(uploadDir, { recursive: true });

    // Write the file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    // Return the public URL path
    const imageUrl = `/${targetFolder}/${filename}`;

    return Response.json({ success: true, imageUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return Response.json(
      { error: "Gagal mengupload file" },
      { status: 500 }
    );
  }
}
