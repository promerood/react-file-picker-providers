import React from "react";
// eslint-disable-next-line import/no-unresolved
import { DropboxChooser, EXTENSION_COMMON } from "react-file-picker-providers";

const APP_KEY = "c48q8vj83tmks2t";

const ExampleDropBox = () => {
  const multiselect = true;
  return (
    <DropboxChooser
      appKey={APP_KEY}
      success={files => {
        // eslint-disable-next-line
        console.log("chose:", files);
      }}
      cancel={() => {
        // eslint-disable-next-line
        console.log("closed");
      }}
      multiselect={multiselect}
      extensions={[
        EXTENSION_COMMON.PDF,
        EXTENSION_COMMON.DOC,
        EXTENSION_COMMON.DOCX,
        EXTENSION_COMMON.XLS
      ]}
    >
      <span>Click me DropBox!</span>
    </DropboxChooser>
  );
};

export default ExampleDropBox;
