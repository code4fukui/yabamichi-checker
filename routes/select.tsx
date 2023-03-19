import { Handlers, PageProps } from "$fresh/server.ts";

export default function(props: PageProps) {
  return (
    <>
      <link rel="stylesheet" type="text/css" href="https://code4sabae.github.io/leaflet-mjs/leaflet.css" />
      <script type="module" src="select.js"></script>
      <div id="map" class="w-full h-96"></div>
      <div id="select-msg" class="text-center">出発地をタップしてください</div>
      <div class="text-center">
        <button id="ok" class="rounded bg-gray-300 pl-7 pr-7 pt-2 pb-2" style="display: none">OK</button>
      </div>
      <form action="result">
        <input type="hidden" name="from_lat" id="from-lat"/>
        <input type="hidden" name="from_lng" id="from-lng"/>
        <input type="hidden" name="to_lat" id="to-lat"/>
        <input type="hidden" name="to_lng" id="to-lng"/>
        <div class="text-center">
          <button id="submit" class="rounded bg-gray-300 pl-7 pr-7 pt-2 pb-2" style="display: none">OK</button>
        </div>
      </form>
    </>
  );
}
