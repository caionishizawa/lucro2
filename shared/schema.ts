import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// We'll add a leads table to capture interested users if needed, 
// though the main focus is the sales page.
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertLeadSchema = createInsertSchema(leads).pick({
  email: true,
  name: true,
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
