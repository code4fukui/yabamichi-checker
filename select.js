import { Page } from "./page.js";

// 視点終点検索
export class Select extends Page {
  contents() {
    return `
      <script type="module" src="./select.js"></script>
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
    `;
  }
}
