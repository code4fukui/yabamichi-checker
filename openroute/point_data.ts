import { Geo3x3 } from "../deps.ts";
import { IDangerSpot } from "../common/types.ts";

// データ取得
const resp = await Deno.readTextFile(`${Deno.cwd()}/data/data.json`);

interface PointData {
  geo: string;
  txt: string;
}

export const pointData: IDangerSpot[] = (JSON.parse(resp) as PointData[])
  .flatMap((row) => {
    const safePos = Geo3x3.decode(row.geo);
    if (!safePos) {
      return [];
    }
    return {
      lat: safePos.lat,
      lng: safePos.lng,
      txt: row.txt,
    };
  });
