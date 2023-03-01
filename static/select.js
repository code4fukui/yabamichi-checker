import { showMap } from "./map.js";

const selectMsg = document.getElementById("select-msg");
const fromLat = document.getElementById("from-lat");
const fromLng = document.getElementById("from-lng");
const toLat = document.getElementById("to-lat");
const toLng = document.getElementById("to-lng");
const ok = document.getElementById("ok");
const submit = document.getElementById("submit");

// 地図
const map = showMap("map");
map.on("click", selectFrom);

let homeMarker;
// 出発地選択
function selectFrom(e) {
  if (homeMarker) {
    map.removeLayer(homeMarker);
  }
  homeMarker = new L.Marker(e.latlng).addTo(map);
  fromLat.value = e.latlng.lat;
  fromLng.value = e.latlng.lng;
  ok.style.display = "inline";
  ok.addEventListener("click", clickOk);
}

// 出発地選択完了
function clickOk() {
  selectMsg.textContent = "目的地をタップしてください";
  ok.style.display = "none";
  map.off("click", selectFrom);
  map.on("click", selectTo);
}

let schoolMarker;
// 到着地選択
function selectTo(e) {
  if (schoolMarker) {
    map.removeLayer(schoolMarker);
  }
  schoolMarker = new L.Marker(e.latlng).addTo(map);
  toLat.value = e.latlng.lat;
  toLng.value = e.latlng.lng;
  submit.style.display = "inline";
}
