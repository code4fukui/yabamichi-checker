export class NotFoundResponse extends Response {
  constructor() {
    super(null, { status: 404 });
  }
}

export class JSONResponse extends Response {
  constructor(json) {
    const init = {
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const body = JSON.stringify(json);
    super(body, init);
  }
}
