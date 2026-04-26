import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "messages.json");

// Ensure data directory and file exist
async function ensureFile() {
  const dir = path.dirname(DATA_FILE);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, "[]", "utf-8");
  }
}

// GET: Read all messages
export async function GET() {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  const messages = JSON.parse(raw);
  return NextResponse.json(messages);
}

// POST: Save a new message
export async function POST(req: NextRequest) {
  await ensureFile();

  const body = await req.json();
  const { name, email, message, createdAt } = body;

  if (!name || !message) {
    return NextResponse.json({ error: "Name and message are required" }, { status: 400 });
  }

  const raw = await fs.readFile(DATA_FILE, "utf-8");
  const messages = JSON.parse(raw);

  const newMessage = {
    id: Date.now(),
    name,
    email: email || null,
    message,
    createdAt: createdAt || new Date().toISOString(),
  };

  messages.push(newMessage);
  await fs.writeFile(DATA_FILE, JSON.stringify(messages, null, 2), "utf-8");

  return NextResponse.json({ success: true, message: newMessage }, { status: 201 });
}
