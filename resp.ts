export class NotFoundResponse extends Response {
  constructor() {
    super(null, { status: 404 });
  }
}

export class JSONResponse extends Response {
  constructor(json: { lat: number; lng: number }[]) {
    const init = {
      headers: {
        "content-type": "application/json",
      }
    };
    const body = JSON.stringify(json);
    super(body, init);
  }
}
