import { renderFileToString } from "dejs";

/** ページ */
export abstract class Page {
  abstract ejs(): string;

  async main(_req: Request) {
    return {};
  }

  async render(req: Request) {
    const param = await this.main(req);
    const body = await renderFileToString(
      `${Deno.cwd()}/${this.ejs()}`,
      param,
    );
    return new Response(body, {
      headers: { "content-type": "text/html" },
    });
  }
}
