import { Point } from "./point.js";

export class FromTo {
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
