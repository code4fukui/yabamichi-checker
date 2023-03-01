import { Point } from "./point.ts";

export class FromTo {
  from: Point;
  to: Point;

  constructor(from: Point, to: Point) {
    this.from = from;
    this.to = to;
  }

  async searchRoute() {
    const key = Deno.env.get("token");
    const url =
      `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${key}&start=${this.from.lng},${this.from.lat}&end=${this.to.lng},${this.to.lat}`;
    const resp = await fetch(url);
    const json = await resp.json();
    const coords = json.features[0].geometry.coordinates as number[][];
    return coords.map((a) => new Point(a[1], a[0]));
  }
}
