import L from "https://code4sabae.github.io/leaflet-mjs/leaflet.mjs";

const tile = "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png";
const attribution =
  '<a href="https://maps.gsi.go.jp/development/ichiran.html">国土地理院</a>';
const maxZoom = 18;
const opt = { attribution, maxZoom };

// 地図を表示
// https://leafletjs.com/reference.html
export function showMap(
  id: string,
  latlon = [35.91172, 136.187928],
  zoom = 15,
) {
  const map = L.map(id).setView(latlon, zoom);
  L.tileLayer(tile, opt).addTo(map);
  return map;
}

export { L };
