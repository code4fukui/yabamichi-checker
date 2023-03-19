import { Handlers, PageProps } from "$fresh/server.ts";

export default function(props: PageProps) {
  return (
    <>
      <img src="logo.png" class="mx-auto w-64 mt-6"/>
      <h1 class="text-center text-gray-600 text-4xl font-bold mt-8">やば道チェッカー</h1>
      <div class="text-center text-blue-700 mt-4">
        いつも通い慣れているあなたの通学路！<br/>
        危険な場所があるかチェックしてみましょう！
      </div>
      <div class="mt-2 mb-2 text-center">
        <a href="select">
          <button class="rounded bg-gray-300 pl-7 pr-7 pt-2 pb-2">始める</button>
        </a>
      </div>
    </>
  );
}
