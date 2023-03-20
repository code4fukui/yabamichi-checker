import { Head } from "$fresh/runtime.ts";

export default function({ Component }) {
  return (
    <>
      <Head>
        <title>やば道チェッカー</title>
        <link rel="icon" type="image/png" href="/logo.png" sizes="16x16" />
      </Head>
      <Component/>
    </>
  );
}