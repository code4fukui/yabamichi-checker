import { showMap } from "./map.js";

const summary = document.getElementById("summary");
const map = showMap("map");

// パラメータ
const param = new URLSearchParams(location.search);
const fromLat = param.get("from_lat");
const fromLng = param.get("from_lng");
const toLat = param.get("to_lat");
const toLng = param.get("to_lng");

onload = async () => {
  // ルート検索
  const url =
    `/route?from_lat=${fromLat}&from_lng=${fromLng}&to_lat=${toLat}&to_lng=${toLng}&`;
  const resp = await fetch(url);
  const route = await resp.json();

  const opt = {
    "color": "#FF0000",
    "weight": 5,
    "opacity": 0.6,
  };
  L.polyline(route.line, opt).addTo(map);

  // 危険地帯表示
  const bindOpt = {
    permanent: true,
    className: "my-label",
    offset: [1, 1],
  };

  let i = 1;
  for (const spot of route.dangerSpots) {
    const txt = spot.txt.replaceAll("\n", "<br>");
    new L.Marker([spot.lat, spot.lng])
      .bindPopup(txt)
      .bindTooltip("" + i, bindOpt)
      .addTo(map);

    summary.innerHTML += "<li>" + txt + "</li>";
    i++;
  }
};
