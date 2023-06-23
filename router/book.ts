import { Hono } from "hono";

import { Book, bookSchema, BookType } from "../db/models/book.ts";
import validator from "../middleware/validator.ts";

const book = new Hono();

const bookValidator = validator(bookSchema);

book.get("/book", async (c) => {
  const list = await Book.all();
  return c.json({ list }, 200);
});

book.get("/book/:id", async (c) => {
  const { id } = c.req.param();
  const book = await Book.where("id", id).first();
  return c.json(book, 200);
});

book.post("/book", bookValidator, async (c) => {
  const body = await c.req.json<BookType>();
  const book = await Book.create({ ...body });
  return c.json(book, 201);
});

book.put("/book/:id", bookValidator, async (c) => {
  const { id } = c.req.param();
  const body = await c.req.json<BookType>();
  const book = await Book.where("id", id).update({ ...body });
  return c.json(book, 200);
});

book.delete("/book/:id", async (c) => {
  const { id } = c.req.param();
  const book = await Book.deleteById(id);
  return c.json(book, 200);
});

export { book };
