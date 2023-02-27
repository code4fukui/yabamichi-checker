import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

serve(async (req) => {
  const { pathname, searchParams } = new URL(req.url);

  if (pathname === "/route") {
    return await routeAPI(searchParams);
  }
  return new NotFoundResponse();
});

async function routeAPI(searchParams: URLSearchParams) {
  const fromLat = Number(searchParams.get("from_lat"));
  const fromLng = Number(searchParams.get("from_lng"));
  const toLat = Number(searchParams.get("to_lat"));
  const toLng = Number(searchParams.get("to_lng"));
  if (isNaN(fromLat) || isNaN(fromLng) || isNaN(toLat) || isNaN(toLng)) {
    return new BadRequestResponse();
  }

  const from = new Point(fromLat, fromLng);
  const to = new Point(toLat, toLng);
  const route = (await from.to(to).searchRoute());
  return new JSONResponse(route);
}

class Point {
  constructor(
    public lat: number,
    public lng: number,
  ) {}

  to(point: Point) {
    return new FromTo(this, point);
  }
}

class FromTo {
  constructor(
    public from: Point,
    public to: Point,
  ) {}

  async searchRoute() {
    const key = Deno.env.get("token");
    const url =
      `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${key}&start=${this.from.lng},${this.from.lat}&end=${this.to.lng},${this.to.lat}`;
    const resp = await fetch(url);
    const json = await resp.json();
    const coords = json.features[0].geometry.coordinates;
    return coords.map((a: number[]) => new Point(a[1], a[0]));
  }
}

class BadRequestResponse extends Response {
  constructor() {
    super(null, { status: 400 });
  }
}

class NotFoundResponse extends Response {
  constructor() {
    super(null, { status: 404 });
  }
}

class JSONResponse extends Response {
  constructor(json: any) {
    const init = {
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const body = JSON.stringify(json);
    super(body, init);
  }
}
