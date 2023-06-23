import { Hono } from "hono";
import { cors, logger, prettyJSON } from "hono/middleware";
import { serve } from "server";

import { book } from "./router/book.ts";
import { db } from "./db/connect.ts";

const api = new Hono();

api.use("*", logger());
api.use("*", prettyJSON());
api.use("/api/*", cors());

api.route("/api", book);
api.notFound((c) => c.json({ message: "Not Found" }, 404));

await db.sync();
serve(api.fetch);
