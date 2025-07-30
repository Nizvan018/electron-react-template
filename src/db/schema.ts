import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

const timestamps = {
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
}

// User table

export const user = sqliteTable("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull().unique(),
    ...timestamps
});

export type SelectUser = typeof user.$inferSelect;
export type InsertUser = typeof user.$inferInsert;

// Task table

export const task = sqliteTable("task", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    date: integer("date", { mode: "timestamp" }).notNull(),
    idUser: text("id_user").notNull().references(() => user.id, { onDelete: "cascade" }),
    ...timestamps
});

export type SelectTask = typeof task.$inferSelect;
export type InsertTask = typeof task.$inferInsert;
