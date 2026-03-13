import { pgTable, text, numeric, serial } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    price: numeric("price", { precision: 18, scale: 4 }).notNull(),
});
export const clients = pgTable("clients", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    cpf: text("cpf").notNull(),
});
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
});
export const company = pgTable("company", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
});