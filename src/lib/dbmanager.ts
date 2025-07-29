import Database from "better-sqlite3";
import path from "path";
import { app } from "electron";

const dbPath = process.env.NODE_ENV === "development" ?
    path.resolve(__dirname, "..", "..", "db", "test.db") :
    path.join(app.getPath("userData"), "test.db");

const db = new Database(dbPath);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

// User table
db.exec(`
    CREATE TABLE IF NOT EXISTS user (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
    )    
`);

export default db;
