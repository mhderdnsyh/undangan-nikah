import { mysqlTable, serial, varchar, text, int, timestamp, mysqlEnum } from "drizzle-orm/mysql-core";

export const guests = mysqlTable("guests", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const rsvps = mysqlTable("rsvps", {
  id: serial("id").primaryKey(),
  guestName: varchar("guest_name", { length: 255 }).notNull(),
  guestId: int("guest_id"), // Optional link to pre-registered guest
  status: mysqlEnum("status", ["hadir", "tidak_hadir"]).notNull(),
  totalGuests: int("total_guests").default(1),
  createdAt: timestamp("created_at").defaultNow(),
});

export const wishes = mysqlTable("wishes", {
  id: serial("id").primaryKey(),
  senderName: varchar("sender_name", { length: 255 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
