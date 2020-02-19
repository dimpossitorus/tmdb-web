import 'semantic-ui-css/semantic.min.css';
import React from "react";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({Component, pageProps}) {
  return <Component {...pageProps} >
    <style jsx global>{`
          .padded {
            padding-bottom: '5em';
          }
        `}</style>
  </Component>
}
