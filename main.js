import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

serve(async (req) => {
  const { pathname, searchParams } = new URL(req.url);

  if (pathname === "/route") {
    return await routeAPI(searchParams);
  }
  return new NotFoundResponse();
});

async function routeAPI(searchParams) {
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

class Point {
  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }

  to(point) {
    return new FromTo(this, point);
  }
}

class FromTo {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }

  async searchRoute() {
    const key = Deno.env.get("token");
    const url =
      `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${key}&start=${this.from.lng},${this.from.lat}&end=${this.to.lng},${this.to.lat}`;
    const resp = await fetch(url);
    const json = await resp.json();
    const coords = json.features[0].geometry.coordinates;
    return coords.map((a) => new Point(a[1], a[0]));
  }
}

class NotFoundResponse extends Response {
  constructor() {
    super(null, { status: 404 });
  }
}

class JSONResponse extends Response {
  constructor(json) {
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
