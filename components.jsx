export const Button = (props) => (
  <button {...props} class="rounded bg-gray-300 pl-7 pr-7 pt-2 pb-2"/>
);

export const Map = (props) => (
  <>
    <link rel="stylesheet" type="text/css" href="https://code4sabae.github.io/leaflet-mjs/leaflet.css" />
    <div
      {...props}
      id="map" class="w-full h-96"
    ></div>
  </>
);
