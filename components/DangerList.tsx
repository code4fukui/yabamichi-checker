import { PointData } from "@/utils/checker.ts";

export function DangerList(props: { dangerSpots: PointData[] }) {
  return (
    <ol class="list-inside list-decimal m-5">
    {props.dangerSpots.map((d) => <li dangerouslySetInnerHTML={{__html: d.txt}}></li>)}
  </ol>
  );
}