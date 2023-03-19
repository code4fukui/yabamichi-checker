import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export default function Home(props: AppProps) {
  return (
    <>
      <Head>
        <title>やば道チェッカー</title>
        <link rel="icon" type="image/png" href="/logo.png" sizes="16x16" />
      </Head>
      <props.Component />
    </>
  );
}
