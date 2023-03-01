import { Point } from "./point.ts";
import { JSONResponse } from "./resp.ts";

export async function routeAPI(searchParams: URLSearchParams) {
  const from = new Point(
    Number(searchParams.get("from_lat")),
    Number(searchParams.get("from_lng")),
  );
  const to = new Point(
    Number(searchParams.get("to_lat")),
    Number(searchParams.get("to_lng")),
  );
  const route = (await from.to(to).searchRoute());
  return new JSONResponse(route);
}
