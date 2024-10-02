import { createId } from "@paralleldrive/cuid2";
import { boolean, pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";

export const employee = pgTable("employee", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  alias: text("alias").notNull().unique(),
  name: text("name").notNull(),
  driver: boolean("driver").notNull(),
  birthdate: text("birthdate").notNull(),
  phoneNumber: text("phone_number").notNull().unique(),
});

export const user = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
  admin: boolean("admin").notNull().default(false),
  employeeId: text("employee_id").references(() => employee.id),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const service = pgTable("service", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  address: text("address").notNull(),
  neighborhood: text("neighborhood").notNull(),
  value: integer("value").notNull(),
  serviceDate: text("service_date").notNull(),
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

export const vehicle = pgTable("vehicle", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  plate: text("plate").unique().notNull(),
  model: text("model").notNull(),
  createdAt: timestamp("date", { withTimezone: true }).notNull().defaultNow(),
});
