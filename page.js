export class Page {
  constructor(req) {
    this.req = req;
  }

  async render() {
    const body = `
      <html lang='ja'>
        <head>
          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width,initial-scale=1.0" />
          <title>やば道チェッカー</title>
          <link rel="stylesheet" href="style.css" />
        </head>
        <body>
          ${await this.contents()}
        </body>
      </html>
    `;
    return new Response(body, {
      headers: { "content-type": "text/html" },
    });
  }
}
