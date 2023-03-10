import { serve } from "https://deno.land/std@0.178.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.178.0/http/file_server.ts";
import { Index } from "./index.js";
import { Select } from "./select.js";
import { Result } from "./result.js";

const router = {
  "/": new Index(),
  "/select": new Select(),
  "/result": new Result(),
};

serve(async (req) => {
  const { pathname } = new URL(req.url);

  const page = router[pathname];
  if (page) {
    return await page.render(req);
  }

  return serveDir(req, { fsRoot: "./static/" });
});
