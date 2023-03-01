/** @jsx h */
import { h } from "./deps.ts";
import { Layout } from "./layout.tsx";

export const Result = () => (
  <Layout>
    <script type="module" src="result.js"></script>
    ここが危ない！
    <div id="map"></div>
    <ol id='summary' style='text-align: left'></ol>
    <a href="/"><button>最初から</button></a>
  </Layout>
);