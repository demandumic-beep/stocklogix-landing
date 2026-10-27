// Тестовий backend: віддає дані з JSON у тому ж форматі, що й Payload CMS.
// Потрібен, щоб робити frontend без бази даних і CMS.
import { readFileSync } from "node:fs";
import express from "express";
import cors from "cors";

interface PageData {
  path: string;
  title: string;
  blocks: unknown[];
}

const read = <T>(file: string): T =>
  JSON.parse(readFileSync(new URL(`./data/${file}`, import.meta.url), "utf-8")) as T;

const common = read<Record<string, unknown>>("common.json");
const pages = read<PageData[]>("pages.json");

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));

// Ті самі адреси, що й у CMS (cms/src/endpoints.ts)
app.get("/api/common", (_req, res) => {
  res.json(common);
});

app.get("/api/page", (req, res) => {
  const page = pages.find((p) => p.path === req.query.path);

  if (!page) {
    res.status(404).json({ error: "Сторінку не знайдено" });
    return;
  }

  res.json(page);
});

const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, () => {
  console.log(`Тестовий backend: http://localhost:${PORT}`);
});
