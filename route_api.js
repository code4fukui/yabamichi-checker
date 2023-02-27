import { Point } from "./point.js";
import { JSONResponse } from "./resp.js";

export async function routeAPI(searchParams) {
  const from = new Point(
    searchParams.get("from_lat"),
    searchParams.get("from_lng"),
  );
  const to = new Point(
    searchParams.get("to_lat"),
    searchParams.get("to_lng"),
  );
  const route = (await from.to(to).searchRoute());
  return new JSONResponse(route);
}
