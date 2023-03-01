import { Route } from "./route.js";

export class FromTo {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }

  // ルート検索
  async searchRoute() {
    const urlbase = "https://yabamichi-checker-api.deno.dev/route";
    const url =
      `${urlbase}?from_lat=${this.from.lat}&from_lng=${this.from.lng}&to_lat=${this.to.lat}&to_lng=${this.to.lng}&`;
    const resp = await fetch(url);
    const json = await resp.json();
    return new Route(json);
  }

  // 距離計算
  distance(unit = "K") {
    const lat1 = this.from.lat;
    const lon1 = this.from.lng;
    const lat2 = this.to.lat;
    const lon2 = this.to.lng;
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    } else {
      const theta = lon1 - lon2;
      let dist =
        Math.sin(lat1 * Math.PI / 180) * Math.sin(lat2 * Math.PI / 180) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
          Math.cos(theta * Math.PI / 180);
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      const miles = dist * 60 * 1.1515;
      unit = unit.toUpperCase();

      if (unit == "K") {
        return miles * 1.609344;
      } else if (unit == "N") {
        return miles * 0.8684;
      } else {
        return miles;
      }
    }
  }
}
