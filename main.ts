import { serve } from "./deps.ts";
import { load, serveDir } from "./deps.ts";
import { Index } from "./index/index.ts";
import { Select } from "./select/select.ts";
import { Result } from "./result/result.ts";
import { Page } from "./common/page.ts";

await load({
  export: true,
});

const router = new Map<string, Page>();
router.set("/", new Index());
router.set("/select", new Select());
router.set("/result", new Result());

serve(async (req: Request) => {
  const { pathname } = new URL(req.url);

  const page = router.get(pathname);
  if (page) {
    return await page.render(req);
  }

  return serveDir(req, { fsRoot: "./static/" });
});
