// common/map.ts
import L from "https://code4sabae.github.io/leaflet-mjs/leaflet.mjs";
var tile = "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png";
var attribution = '<a href="https://maps.gsi.go.jp/development/ichiran.html">\u56FD\u571F\u5730\u7406\u9662</a>';
var maxZoom = 18;
var opt = { attribution, maxZoom };
function showMap(id, latlon = [35.91172, 136.187928], zoom = 15) {
  const map = L.map(id).setView(latlon, zoom);
  L.tileLayer(tile, opt).addTo(map);
  return map;
}

// select/select_front.ts
function select() {
  const selectMsg = document.getElementById("select-msg");
  const fromLat = document.getElementById("from-lat");
  const fromLng = document.getElementById("from-lng");
  const toLat = document.getElementById("to-lat");
  const toLng = document.getElementById("to-lng");
  const ok = document.getElementById("ok");
  const submit = document.getElementById("submit");
  const map = showMap("map");
  let homeSelected = false;
  let homeMarker;
  let schoolMarker;
  map.on("click", (e) => {
    if (!homeSelected) {
      if (homeMarker) {
        map.removeLayer(homeMarker);
      } else {
        ok.style.display = "inline";
      }
      homeMarker = new L.Marker(e.latlng).addTo(map);
      fromLat.value = e.latlng.lat;
      fromLng.value = e.latlng.lng;
    } else {
      if (schoolMarker) {
        map.removeLayer(schoolMarker);
      } else {
        submit.style.display = "inline";
      }
      schoolMarker = new L.Marker(e.latlng).addTo(map);
      toLat.value = e.latlng.lat;
      toLng.value = e.latlng.lng;
    }
  });
  ok.onclick = () => {
    selectMsg.textContent = "\u76EE\u7684\u5730\u3092\u30BF\u30C3\u30D7\u3057\u3066\u304F\u3060\u3055\u3044";
    ok.style.display = "none";
    homeSelected = true;
  };
}

// result/result_front.ts
function result() {
  const mapE = document.getElementById("map");
  const showRanking = document.getElementById("show-ranking");
  const line = JSON.parse(mapE.dataset.line);
  const dangerSpots = JSON.parse(mapE.dataset.dangerSpots);
  const map = showMap("map");
  const opt2 = {
    "color": "#FF0000",
    "weight": 5,
    "opacity": 0.6
  };
  L.polyline(line, opt2).addTo(map);
  const bindOpt = {
    permanent: true,
    className: "my-label",
    offset: [1, 1]
  };
  let i = 1;
  const LeafIcon = L.Icon.extend({
    options: {
      iconSize: [20, 20],
      iconAnchor: [20, 10]
    }
  });
  const icon = new LeafIcon({
    iconUrl: "warning.png"
  });
  for (const spot of dangerSpots) {
    const txt = spot.txt.replaceAll("\n", "<br>");
    new L.Marker([spot.lat, spot.lng], { icon }).bindPopup(txt).bindTooltip("" + i, bindOpt).addTo(map);
    i++;
  }
  showRanking.onclick = () => {
    const data = [
      {
        img: "1.png",
        txt: "\u770C\u9053212\u53F7\u3068\u65E5\u91CE\u5DDD\u5824\u9632\u3068\u306E\u4EA4\u5DEE\u70B9<br>\u4E8B\u6545\u4EF6\u65704\u56DE",
        lat: 35.918849,
        lng: 136.174519
      },
      {
        img: "2.png",
        txt: "\u585A\u753A\u4EA4\u5DEE\u70B9\u3068\u56FD\u9AD8\u5C0F\u5B66\u6821\u306E\u3061\u3087\u3046\u3069\u4E2D\u9593\u5730\u70B9\u306B\u3042\u308B\u4EA4\u5DEE\u70B9<br>\u4E8B\u6545\u4EF6\u65702\u56DE",
        lat: 35.912397,
        lng: 136.188945
      },
      {
        img: "3.png",
        txt: "\u6B66\u751F\u9AD8\u6821\u6821\u5EAD\u306E\u6771\u5074<br>\u4E8B\u6545\u4EF6\u65702\u56DE",
        lat: 35.910282,
        lng: 136.177118
      }
    ];
    for (const d of data) {
      const icon2 = new LeafIcon({
        iconUrl: d.img
      });
      new L.Marker([d.lat, d.lng], { icon: icon2 }).bindPopup(d.txt).addTo(map);
    }
  };
}
export {
  result,
  select
};
