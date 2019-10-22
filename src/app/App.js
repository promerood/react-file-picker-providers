import React from "react";
// eslint-disable-next-line import/no-unresolved
import { ExampleDropBox, ExampleGoogleChooser } from "./examples/index";

const App = () => {
  return (
    <div>
      <header className="page-header">
        <h1>Providers Test </h1>
      </header>
      <main className="page-container">
        <ExampleDropBox />
        <ExampleGoogleChooser />
      </main>
    </div>
  );
  // }
};

export default App;
