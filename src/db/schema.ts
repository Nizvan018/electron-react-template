import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

const timestamps = {
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
}

export const user = sqliteTable("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull().unique(),
    ...timestamps
});

export type SelectUser = typeof user.$inferSelect;
export type InsertUser = typeof user.$inferInsert;
