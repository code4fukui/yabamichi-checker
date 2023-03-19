export function Map(props: any) {
  return (
    <>
      <link rel="stylesheet" type="text/css" href="https://code4sabae.github.io/leaflet-mjs/leaflet.css" />
      <div
        {...props}
        id="map" class="w-full h-96"
      ></div>
    </>
  );
}
