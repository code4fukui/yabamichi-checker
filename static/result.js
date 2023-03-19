import { L, showMap } from "./map.js";

const mapE = document.getElementById("map");
const showRanking = document.getElementById("show-ranking");
const map = showMap("map");

/** 経路表示 */
const drawLine = () => {
  const line = JSON.parse(mapE.dataset.line);
  const opt = {
    "color": "#FF0000",
    "weight": 5,
    "opacity": 0.6,
  };
  L.polyline(line, opt).addTo(map);
}

/** 危険地帯表示 */
const drawDangerLine = () =>{
  const dangerSpots = JSON.parse(mapE.dataset.dangerSpots);
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
    iconUrl: "warning.png",
  });
  for (const spot of dangerSpots) {
    const txt = spot.txt.replaceAll("\n", "<br>");
    new L.Marker([spot.pos.lat, spot.pos.lng], { icon })
      .bindPopup(txt)
      .bindTooltip("" + i, bindOpt)
      .addTo(map);
    i++;
  }
}

/** ランキング表示 */
const drawRanking = () => {
  const data = [
    {
      img: "1.png",
      txt: "県道212号と日野川堤防との交差点<br>事故件数4回",
      pos: {
        lat: 35.918849,
        lng: 136.174519,
      }
    },
    {
      img: "2.png",
      txt:
        "塚町交差点と国高小学校のちょうど中間地点にある交差点<br>事故件数2回",
      pos: {
        lat: 35.912397,
        lng: 136.188945
      }
    },
    {
      img: "3.png",
      txt: "武生高校校庭の東側<br>事故件数2回",
      pos: {
        lat: 35.910282,
        lng: 136.177118
      }
    },
  ];

  const LeafIcon = L.Icon.extend({
    options: {
      iconSize: [20, 20],
      iconAnchor: [20, 10],
    },
  });

  for (const d of data) {
    const icon = new LeafIcon({
      iconUrl: d.img,
    });
    new L.Marker([d.pos.lat, d.pos.lng], { icon })
      .bindPopup(d.txt)
      .addTo(map);
  }
}

drawLine();
drawDangerLine();
showRanking.addEventListener("click", drawRanking);
