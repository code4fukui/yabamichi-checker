import { showMap } from "./map.js";
import { Point } from "./point.js";

const summary = document.getElementById("summary");

const map = showMap("map");

// パラメータ
const param = new URLSearchParams(location.search);

const from = new Point(
  parseFloat(param.get("from_lat")),
  parseFloat(param.get("from_lng")),
);

const to = new Point(
  parseFloat(param.get("to_lat")),
  parseFloat(param.get("to_lng")),
);

const fromTo = from.to(to);

// ルート表示
const route = await fromTo.searchRoute();
const opt = {
  "color": "#FF0000",
  "weight": 5,
  "opacity": 0.6,
};
L.polyline(route.line, opt).addTo(map);

// 危険地帯表示
let i = 1;
const set = new Set();
for (const pos of route.line) {
  const point = new Point(pos.lat, pos.lng);
  const spots = await point.searchSpot();
  for (const spot of spots) {
    const key = JSON.stringify(spot);
    if (set.has(key)) {
      continue;
    }
    set.add(key);

    const bindOpt = {
      permanent: true,
      className: "my-label",
      offset: [1, 1],
    };
    const txt = spot.txt.replaceAll("\n", "<br>");
    new L.Marker([spot.lat, spot.lng])
      .bindPopup(txt)
      .bindTooltip("" + i, bindOpt)
      .addTo(map);

    summary.innerHTML += "<li>" + txt + "</li>";
    i++;
  }
}
