import React from "react";
// eslint-disable-next-line import/no-unresolved
import { DropboxChooser } from "react-file-picker-providers";

const APP_KEY = "6uiphby8spt4xnu";

const ExampleDropBox = () => {
  const ext = ["PDF", "DOC", "DOCX", "XLS"];
  const multiselect = true;
  return (
    <DropboxChooser
      appKey={APP_KEY}
      success={(files) => {
        // eslint-disable-next-line
        console.log("chose:", files);
      }}
      cancel={() => {
        // eslint-disable-next-line
        console.log("closed");
      }}
      multiselect={multiselect}
      extensions={ext}
    >
      <span>Click me DropBox!</span>
    </DropboxChooser>
  );
};

export default ExampleDropBox;
