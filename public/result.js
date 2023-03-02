import { showMap } from "./map.js";

onload = () => {
  const mapE = document.getElementById("map");
  const map = showMap("map");
  const opt = {
    "color": "#FF0000",
    "weight": 5,
    "opacity": 0.6,
  };
  const line = JSON.parse(mapE.dataset.line);
  L.polyline(line, opt).addTo(map);

  // 危険地帯表示
  const dangerSpots = JSON.parse(mapE.dataset.dangerSpots);

  const bindOpt = {
    permanent: true,
    className: "my-label",
    offset: [1, 1],
  };

  let i = 1;
  for (const spot of dangerSpots) {
    const txt = spot.txt.replaceAll("\n", "<br>");
    new L.Marker([spot.lat, spot.lng])
      .bindPopup(txt)
      .bindTooltip("" + i, bindOpt)
      .addTo(map);
    i++;
  }
};
