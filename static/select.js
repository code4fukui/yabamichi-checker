import { L, showMap } from "./map.js";

const selectMsg = document.getElementById("select-msg");
const fromLat = document.getElementById("from_lat");
const fromLng = document.getElementById("from_lng");
const toLat = document.getElementById("to_lat");
const toLng = document.getElementById("to_lng");
const ok = document.getElementById("ok");
const submit = document.getElementById("submit");
const map = showMap("map");

let homeSelected = false, homeMarker, schoolMarker;

/** 出発地選択 */
function selectHome(e) {
  if (homeMarker) {
    map.removeLayer(homeMarker);
  } else {
    ok.style.display = "inline";
  }
  homeMarker = new L.Marker(e.latlng).addTo(map);
  fromLat.value = e.latlng.lat;
  fromLng.value = e.latlng.lng;
}

/** 到着地選択 */
function selectSchool(e) {
  if (schoolMarker) {
    map.removeLayer(schoolMarker);
  } else {
    submit.style.display = "inline";
  }
  schoolMarker = new L.Marker(e.latlng).addTo(map);
  toLat.value = e.latlng.lat;
  toLng.value = e.latlng.lng;
}

/** マップクリック */
function mapClicked(e) {
  if (!homeSelected) {
    selectHome(e);
  } else {
    selectSchool(e);
  }
}

/** OKクリック */
function okClicked() {
  selectMsg.textContent = "目的地をタップしてください";
  ok.style.display = "none";
  homeSelected = true;
}

map.on("click", mapClicked);
ok.addEventListener("click", okClicked);
