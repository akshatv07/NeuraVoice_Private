import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from "@shared/schema";

// For local development, use SQLite
const sqlite = new Database('local.db');

// Create tables if they don't exist
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY NOT NULL,
    email TEXT,
    first_name TEXT,
    last_name TEXT,
    profile_image_url TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(email)
  );

  CREATE TABLE IF NOT EXISTS voice_agents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    goal TEXT,
    voice_model TEXT,
    knowledge_base TEXT,
    status TEXT DEFAULT 'draft',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  -- Insert dummy user if not exists
  INSERT OR IGNORE INTO users (id, email, first_name, last_name, profile_image_url) 
  VALUES ('user1', 'test@example.com', 'John', 'Doe', 'https://i.pravatar.cc/150?img=1');

  -- Insert dummy voice agents if none exist
  INSERT OR IGNORE INTO voice_agents (user_id, name, goal, voice_model, status)
  VALUES 
    ('user1', 'Customer Support Bot', 'Help customers with common issues', 'en-US-Wavenet-D', 'ready'),
    ('user1', 'Sales Assistant', 'Assist with sales inquiries', 'en-US-Standard-B', 'draft'),
    ('user1', 'Appointment Scheduler', 'Schedule and manage appointments', 'en-US-Wavenet-C', 'deployed');
`);

export const db = drizzle(sqlite, { schema });