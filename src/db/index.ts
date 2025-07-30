import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import Database from "better-sqlite3";
import path from "path";
import { app } from "electron";
import * as schema from "./schema";
import fs from "fs";

// Initialize the db:

const dbPath = process.env.NODE_ENV === "development" ?
    path.join(__dirname, "..", "..", "src", "db", "test.db") :
    path.join(app.getPath("userData"), "test.db");

const sqlite = new Database(dbPath);

sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");

export const db = drizzle({ client: sqlite, schema });

// Apply the migrations:

const migrationsPath = path.join(process.resourcesPath, "./drizzle");

if (fs.existsSync(migrationsPath)) {
    try {
        migrate(db, { migrationsFolder: migrationsPath });
        console.log("Migraciones aplicadas correctamente");
    } catch (err) {
        console.error("Error al aplicar migraciones:", err);
    }
} else {
    console.warn("No se encontraron migraciones en:", migrationsPath);
}
