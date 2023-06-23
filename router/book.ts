import { Hono } from "hono";

import { Book, bookSchema } from "../db/models/book.ts";

const book = new Hono();

book.get("/book", async (c) => {
  const list = await Book.all();
  return c.json({ list }, 200);
});

book.get("/book/:id", async (c) => {
  const { id } = c.req.param();
  const book = await Book.where("id", id).first();
  return c.json(book, 200);
});

book.post("/book", async (c) => {
  const body = await c.req.json();

  const val = bookSchema.safeParse(body);
  if (!val.success) return c.text("Invalid!", 500);

  await Book.create({ ...val.data });
  return c.body("Created", 201);
});

book.put("/book/:id", async (c) => {
  const { id } = c.req.param();
  const body = await c.req.json();

  const val = bookSchema.safeParse(body);
  if (!val.success) return c.text("Invalid!", 500);

  await Book.where("id", id).update({ ...val.data });
  return c.body("Updated", 200);
});

book.delete("/book/:id", async (c) => {
  const { id } = c.req.param();
  await Book.deleteById(id);
  return c.body("Deleted", 200);
});

export { book };
