import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

serve(handler);

const init = {
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

async function handler(req) {
  const { pathname, searchParams } = new URL(req.url);
  if (pathname === "/route") {
    const from = {
      lat: searchParams.get("from_lat"),
      lng: searchParams.get("from_lng"),
    };
    const to = {
      lat: searchParams.get("to_lat"),
      lng: searchParams.get("to_lng"),
    };
    const wayPoints = new WayPoints();
    wayPoints.add(from);
    wayPoints.add(to);
    const route = await wayPoints.searchRoute();
    return new Response(route.toJson(), init);
  }
  return new Response(null, { status: 404 });
}

class WayPoints {
  constructor() {
    this.list = [];
  }

  add(point) {
    this.list.push(point);
  }

  async searchRoute() {
    const from = this.list[0];
    const to = this.list[1];
    const key = Deno.env.get("token");
    const url =
      `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${key}&start=${from.lng},${from.lat}&end=${to.lng},${to.lat}`;
    const resp = await fetch(url);
    const json = await resp.json();
    const coords = json.features[0].geometry.coordinates;
    return new Route(coords.map((a) => ({ lat: a[1], lng: a[0] })));
  }
}

class Route {
  constructor(coords) {
    this.coords = coords;
  }

  toJson() {
    return JSON.stringify(this.coords);
  }
}
