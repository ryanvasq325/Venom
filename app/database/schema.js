import { pgTable, varchar, numeric, serial } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    price: numeric("price", { precision: 18, scale: 4 }).notNull(),
});
export const clients = pgTable("clients", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    cpf: varchar("cpf", { length: 255 }).notNull(),
});
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
});
export const company = pgTable("company", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
});