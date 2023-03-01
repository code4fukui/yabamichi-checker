/** @jsx h */
import { h } from "./deps.ts";

export const Layout = ({ children }) => (
  <html lang='ja'>

    <head>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <title>やば道チェッカー</title>
      <link rel="stylesheet" href="style.css" />
    </head>

    <body>
      {children}
    </body>
  </html>
);