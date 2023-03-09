import { serve } from "https://deno.land/std@0.178.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.178.0/http/file_server.ts";
import { renderFileToString } from "./deps.js";
import { result } from "./result.js";

serve(async (req) => {
  const { pathname } = new URL(req.url);
  if (pathname == "/") {
    return await render("index.ejs");
  } else if (pathname == "/select") {
    return await render("select.ejs");
  } else if (pathname == "/result") {
    const param = await result(req);
    return await render("result.ejs", param);
  }
  return serveDir(req, { fsRoot: "./static/" });
});

async function render(ejs, param) {
  const body = await renderFileToString(`${Deno.cwd()}/${ejs}`, param);
  return new Response(body, {
    headers: { "content-type": "text/html" },
  });
}
