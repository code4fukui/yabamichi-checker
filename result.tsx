/** @jsx h */
import { h } from "./deps.ts";
import { Layout } from "./layout.tsx";

export const Result = ({ line, dangerSpots }) => (
  <Layout>
    <script type="module" src="result.js"></script>
    ここが危ない！
    <div id="map"
      data-line={JSON.stringify(line)}
      data-danger-spots={JSON.stringify(dangerSpots)}
    ></div>
    <ol style='text-align: left'>
      {dangerSpots.map(d => <li>{d.txt}</li>)}
    </ol>
    <a href="/"><button>最初から</button></a>
  </Layout>
);