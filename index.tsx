/** @jsx h */
import { h } from "./deps.ts";
import { Layout } from "./layout.tsx";

export const Index = () => (
  <Layout>
    <h1>やば道チェッカー</h1>
    <div class="msg">
      いつも通い慣れているあなたの通学路！<br/>
      危険な場所があるかチェックしてみましょう！
    </div>
    <a href="select"><button>始める</button></a>
  </Layout>
);