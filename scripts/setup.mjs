// Створює .env файли з прикладів (якщо їх ще немає) і генерує PAYLOAD_SECRET.
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomBytes } from "node:crypto";

function ensure(dir) {
  const target = `${dir}/.env`;
  if (existsSync(target)) return console.log(`${target} вже є, пропускаю`);
  copyFileSync(`${dir}/.env.example`, target);

  if (dir === "cms") {
    const text = readFileSync(target, "utf-8").replace(
      /^PAYLOAD_SECRET=.*$/m,
      `PAYLOAD_SECRET=${randomBytes(32).toString("hex")}`,
    );
    writeFileSync(target, text);
  }
  console.log(`Створено ${target}`);
}

ensure("cms");
ensure("backend");
