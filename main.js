import { serve } from "https://deno.land/std@0.177.0/http/server.ts"

async function searchRoute(from, to) {
  let key = Deno.env.get("token")
  let url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${key}&start=${from.lng},${from.lat}&end=${to.lng},${to.lat}`
  const resp = await fetch(url)
  let json = await resp.json()
  let coords = json.features[0].geometry.coordinates
  return coords.map(a => ({ lat: a[1], lng: a[0] }))
}

async function handler(req) {
  let { pathname, searchParams } = new URL(req.url)
  if (pathname == "/route") {
    let from = {
      lat: searchParams.get("from_lat"),
      lng: searchParams.get("from_lng")
    }
    let to = {
      lat: searchParams.get("to_lat"),
      lng: searchParams.get("to_lng")
    }
    let coords = await searchRoute(from, to)
    let init = {
      headers: {
        "content-type":"application/json",
        "Access-Control-Allow-Origin": "*"
        }
      }
    let body = JSON.stringify(coords)
    return new Response(body, init)
  }
  return new Response(null, { status: 404 })
}

serve(handler)
