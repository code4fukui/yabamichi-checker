import { serve } from "https://deno.land/std@0.178.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.178.0/http/file_server.ts";

import { Index } from "./index.js";
import { Select } from "./select.js";
import { Result } from "./result.js";

serve(async (req) => {
  // ルーティング
  const router = [
    { pathname: "/", handler: Index },
    { pathname: "/select", handler: Select },
    { pathname: "/result", handler: Result },
  ];

  for (const r of router) {
    console.log(r);
    const pat = new URLPattern({ pathname: r.pathname });
    if (pat.test(req.url)) {
      const page = new r.handler(req);
      return await page.render();
    }
  }
  return serveDir(req, { fsRoot: "./static/" });
});
