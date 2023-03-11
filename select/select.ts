import { Page } from "../common/page.ts";

export class Select extends Page {
  override ejs() {
    return "select/select.ejs";
  }
}
