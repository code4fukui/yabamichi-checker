import { JSX } from "preact";

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      class="rounded bg-gray-300 pl-7 pr-7 pt-2 pb-2"
    />
  );
}