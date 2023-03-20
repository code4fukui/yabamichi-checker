import { Button, Map, Params } from "../components.jsx";

export default function() {
  const Params = ({ names }) => names.map(name => <input type="hidden" name={name} id={name}/>);

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
        <Params names={["from_lat", "from_lng", "to_lat", "to_lng"]}/>
        <div class="text-center">
          <Button id="submit" class="justify-center" style="display: none">OK</Button>
        </div>
      </form>
    </>
  );
}

