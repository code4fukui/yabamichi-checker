import { renderFileToString } from "./deps.js";

export class Page {
  async main(req) {
    return {};
  }

  async render(req) {
    const param = await this.main(req);
    const body = await renderFileToString(`${Deno.cwd()}/${this.ejs}`, param);
    return new Response(body, {
      headers: { "content-type": "text/html" },
    });
  }
}
