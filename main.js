import { serve } from "https://deno.land/std@0.178.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.178.0/http/file_server.ts";
import { Geo3x3 } from "https://taisukef.github.io/Geo3x3/Geo3x3.js";

class Page {
  constructor(req) {
    this.req = req;
  }

  async response() {
    const body = `
      <html lang='ja'>
        <head>
          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width,initial-scale=1.0" />
          <title>やば道チェッカー</title>
          <link rel="stylesheet" href="style.css" />
        </head>
        <body>
          ${await this.main()}
        </body>
      </html>
    `;
    return new Response(body, {
      headers: { "content-type": "text/html" },
    });
  }
}

// トップページ
class Index extends Page {
  main() {
    return `
      <h1>やば道チェッカー</h1>
      <div class="msg">
        いつも通い慣れているあなたの通学路！<br/>
        危険な場所があるかチェックしてみましょう！
      </div>
      <a href="select"><button>始める</button></a>
    `;
  }
}

// 視点終点検索
class Select extends Page {
  main() {
    return `
      <script type="module" src="./select.js"></script>
      <div id="map"></div>
      <div id="select-msg">出発地をタップしてください</div>
      <button id="ok" style="display: none">OK</button>
      <form action="result">
        <input type="hidden" name="from_lat" id="from-lat"/>
        <input type="hidden" name="from_lng" id="from-lng"/>
        <input type="hidden" name="to_lat" id="to-lat"/>
        <input type="hidden" name="to_lng" id="to-lng"/>
        <button id="submit" style="display: none">OK</button>
      </form>
    `;
  }
}

// 結果ページ
class Result extends Page {
  async main() {
    const { searchParams } = new URL(this.req.url);
    const from = new Point(
      Number(searchParams.get("from_lat")),
      Number(searchParams.get("from_lng")),
    );
    const to = new Point(
      Number(searchParams.get("to_lat")),
      Number(searchParams.get("to_lng")),
    );
    const line = await from.to(to).searchRoute();

    // 危険地帯表示
    const set = new Set();
    const dangerSpots = [];
    for (const pos of line) {
      const point = new Point(pos.lat, pos.lng);
      const spots = await point.searchSpot();
      for (const spot of spots) {
        const key = JSON.stringify(spot);
        if (set.has(key)) {
          continue;
        }
        set.add(key);
        dangerSpots.push(spot);
      }
    }

    let da = "";
    for (const d of dangerSpots) {
      da += `<li>${d.txt}</li>`;
    }

    return `
      <script type="module" src="./result.js"></script>
      ここが危ない！
      <div
        id="map"
        data-line='${JSON.stringify(line)}'
        data-danger-spots='${JSON.stringify(dangerSpots)}'
      ></div>
      <ol style='text-align: left'>
        ${da}
      </ol>
      <a href="/"><button>最初から</button></a>
    `;
  }
}

// 一点
class Point {
  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }

  to(point) {
    return new FromTo(this, point);
  }

  // 危険地帯抽出
  searchSpot() {
    return Point.data.filter((a) => {
      const point = new Point(a.lat, a.lng);
      const fromTo = this.to(point);
      const dist = fromTo.distance();
      return dist < 0.1;
    });
  }
}

// データ取得
const resp = await Deno.readTextFile("./data.json");
Point.data = JSON.parse(resp).map((row) => {
  const safePos = Geo3x3.decode(row.geo);
  return {
    lat: safePos.lat,
    lng: safePos.lng,
    txt: row.txt,
  };
});

// 始点終点
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

serve(async (req) => {
  // ルーティング
  const router = [
    { pathname: "/", handler: Index },
    { pathname: "/select", handler: Select },
    { pathname: "/result", handler: Result },
  ];

  for (const r of router) {
    const pat = new URLPattern({ pathname: r.pathname });
    if (pat.test(req.url)) {
      return await new r.handler(req).response();
    }
  }
  return serveDir(req, { fsRoot: "./static/" });
});
