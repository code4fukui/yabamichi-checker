import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

async function searchRoute(from, to) {
  const key = Deno.env.get("token");
  const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${key}&start=${from.lng},${from.lat}&end=${to.lng},${to.lat}`;
  const resp = await fetch(url);
  const json = await resp.json();
  const coords = json.features[0].geometry.coordinates;
  return coords.map(a => ({ lat: a[1], lng: a[0] }));
}

async function handler(req) {
  const { pathname, searchParams } = new URL(req.url);
  if (pathname === "/route") {
    const from = {
      lat: searchParams.get("from_lat"),
      lng: searchParams.get("from_lng")
    };
    const to = {
      lat: searchParams.get("to_lat"),
      lng: searchParams.get("to_lng")
    };
    const coords = await searchRoute(from, to);
    const init = {
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    };
    const body = JSON.stringify(coords);

    return new Response(body, init);
  }
  return new Response(null, { status: 404 })
}

serve(handler);
