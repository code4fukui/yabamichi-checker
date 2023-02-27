import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { routeAPI } from "./route_api.js";
import { NotFoundResponse } from "./resp.js";

serve(async (req) => {
  const { pathname, searchParams } = new URL(req.url);

  if (pathname === "/route") {
    return await routeAPI(searchParams);
  }
  return new NotFoundResponse();
});
