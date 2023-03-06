import { showMap } from "./map.js";

onload = () => {
  const mapE = document.getElementById("map");
  const line = JSON.parse(unescape(mapE.dataset.line));
  const dangerSpots = JSON.parse(unescape(mapE.dataset.dangerSpots));

  const map = showMap("map");
  const opt = {
    "color": "#FF0000",
    "weight": 5,
    "opacity": 0.6,
  };
  L.polyline(line, opt).addTo(map);

  // 危険地帯表示
  const bindOpt = {
    permanent: true,
    className: "my-label",
    offset: [1, 1],
  };

  let i = 1;

  const LeafIcon = L.Icon.extend({
    options: {
      iconSize: [20, 20],
      iconAnchor: [20, 10],
    },
  });

  const icon = new LeafIcon({
    iconUrl: "./warning.png",
  });
  for (const spot of dangerSpots) {
    const txt = spot.txt.replaceAll("\n", "<br>");
    new L.Marker([spot.lat, spot.lng], { icon })
      .bindPopup(txt)
      .bindTooltip("" + i, bindOpt)
      .addTo(map);
    i++;
  }
};
