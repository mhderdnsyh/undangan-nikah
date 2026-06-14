import { Elysia, t } from "elysia";
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

export const uploadRoutes = new Elysia({ prefix: "/api" }).post(
  "/upload-proof",
  async ({ body, set }) => {
    try {
      const file = body.file as File;

      if (!file) {
        set.status = 400;
        return {
          success: false,
          message: "No file uploaded",
        };
      }

      // Pastikan folder public/uploads ada
      const uploadDir = join(process.cwd(), "public", "uploads");
      if (!existsSync(uploadDir)) {
        mkdirSync(uploadDir, { recursive: true });
      }

      // Generate nama file unik
      const ext = file.name.split(".").pop();
      const filename = `proof-${Date.now()}.${ext}`;
      const filePath = join(uploadDir, filename);

      // Simpan file menggunakan Bun
      await Bun.write(filePath, file);

      return {
        success: true,
        message: "File successfully uploaded",
        // Kembalikan public URL (karena folder public di-serve secara static di root '/')
        data: {
          url: `/uploads/${filename}`,
        },
      };
    } catch (error) {
      set.status = 500;
      return {
        success: false,
        message: "Failed to upload file",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
  {
    body: t.Object({
      file: t.File(),
    }),
  }
);
