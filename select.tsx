/** @jsx h */
import { h } from "./deps.ts";
import { Layout } from "./layout.tsx";

export const Select = () => (
  <Layout>
    <script type="module" src="select.js"></script>
    <div id="map"></div>
    <div id="select-msg">出発地をタップしてください</div>
    <button id="ok" style="display: none">OK</button>
    <form action="result">
      <input type="hidden" name="from_lat" id="from-lat"/>
      <input type="hidden" name="from_lng" id="from-lng"/>
      <input type="hidden" name="to_lat" id="to-lat"/>
      <input type="hidden" name="to_lng" id="to-lng"/>
      <button id="submit" style="display: none">OK</button>
    </form>
  </Layout>
);
