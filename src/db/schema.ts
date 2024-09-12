import { createId } from "@paralleldrive/cuid2";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const employee = pgTable("employee", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  driver: boolean("driver").notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const service = pgTable("service", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  address: text("address").notNull(),
  value: text("value").notNull(),
  date: timestamp("date", { withTimezone: true }).notNull(),
  createdAt: timestamp("date", { withTimezone: true }).notNull().defaultNow(),
});

export const employeeService = pgTable("employee_service", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  employeeId: text("employee_id")
    .references(() => employee.id)
    .notNull(),
  serviceId: text("service_id")
    .references(() => service.id)
    .notNull(),
});