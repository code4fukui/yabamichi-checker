/// <reference lib="dom" />

import { L, showMap } from "./map.ts";

export function select() {
  const selectMsg = document.getElementById("select-msg")!;
  const fromLat = document.getElementById("from-lat") as HTMLInputElement;
  const fromLng = document.getElementById("from-lng") as HTMLInputElement;
  const toLat = document.getElementById("to-lat") as HTMLInputElement;
  const toLng = document.getElementById("to-lng") as HTMLInputElement;
  const ok = document.getElementById("ok")!;
  const submit = document.getElementById("submit")!;

  // 地図
  const map = showMap("map");

  let homeSelected = false;
  let homeMarker: any;
  let schoolMarker: any;
  map.on("click", (e: any) => {
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
}
