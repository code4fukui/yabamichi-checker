#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";

import { load } from "https://deno.land/std@0.179.0/dotenv/mod.ts";
await load({ export: true });

await dev(import.meta.url, "./main.ts");
