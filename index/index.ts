import { Page } from "../common/page.ts";

export class Index extends Page {
  override ejs() {
    return "index/index.ejs";
  }
}
