/** @jsx h */
import { h, jsx, json, serve, serveStatic } from "./deps.ts";
import { routeAPI } from "./route_api.ts";
import { Index } from "./index.tsx";
import { Select } from "./select.tsx";
import { Result } from "./result.tsx";

serve({
  "/": () => jsx(<Index/>),
  "/select": () => jsx(<Select/>),
  "/result": () => jsx(<Result/>),
  "/route": async (req) => {
    const { searchParams } = new URL(req.url);
    return json(await routeAPI(searchParams));
  },
  "/:filename+": serveStatic("public", { baseUrl: import.meta.url }),
});
