import type { AnyZodObject } from "zod";
import type { Context, Next } from "hono";

export default (schema: AnyZodObject) => async (c: Context, next: Next) => {
  const body = await c.req.json();

  const result = schema.safeParse(body);
  if (!result.success) return c.text("Invalid!", 500);

  await next();
};
