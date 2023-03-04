import { showMap } from "./map.js";

onload = () => {
  const selectMsg = document.getElementById("select-msg");
  const fromLat = document.getElementById("from-lat");
  const fromLng = document.getElementById("from-lng");
  const toLat = document.getElementById("to-lat");
  const toLng = document.getElementById("to-lng");
  const ok = document.getElementById("ok");
  const submit = document.getElementById("submit");

  // 地図
  const map = showMap("map");

  let homeSelected = false;
  let homeMarker, schoolMarker;
  map.on("click", (e) => {
    if (!homeSelected) {
      // 出発地選択
      if (homeMarker) {
        map.removeLayer(homeMarker);
      } else {
        ok.style.display = "inline";
      }
      homeMarker = new L.Marker(e.latlng).addTo(map);
      fromLat.value = e.latlng.lat;
      fromLng.value = e.latlng.lng;
    } else {
      // 到着地選択
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
    selectMsg.textContent = "目的地をタップしてください";
    ok.style.display = "none";
    homeSelected = true;
  };
};
