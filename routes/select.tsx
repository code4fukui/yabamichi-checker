import { Button } from "@/components/Button.tsx";
import { Map } from "@/components/Map.tsx";

export default function Select() {
  return (
    <>
      <script type="module" src="select.js"></script>
      <Map/>
      <div id="select-msg" class="text-center">
        出発地をタップしてください
      </div>
      <div class="text-center">
        <Button id="ok" style="display: none">OK</Button>
      </div>
      <form action="result">
        <input type="hidden" name="from_lat" id="from-lat"/>
        <input type="hidden" name="from_lng" id="from-lng"/>
        <input type="hidden" name="to_lat" id="to-lat"/>
        <input type="hidden" name="to_lng" id="to-lng"/>
        <div class="text-center">
          <Button id="submit" style="display: none">OK</Button>
        </div>
      </form>
    </>
  );
}
