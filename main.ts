import { serve } from "https://deno.land/std@0.178.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.178.0/http/file_server.ts";
import { routeAPI } from "./route_api.ts";
import { NotFoundResponse } from "./resp.ts";

serve(async (req: Request) => {
  const { pathname, searchParams } = new URL(req.url);

  console.log(pathname);
  if (pathname === "/route") {
    return await routeAPI(searchParams);
  } else {
    return serveDir(req, {
      fsRoot: "static",
    });
  }
});
