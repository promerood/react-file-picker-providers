/* eslint-disable no-console */
import React from "react";
// eslint-disable-next-line import/no-unresolved
import { GoogleChooser, EXTENSION_COMMON } from "react-file-picker-providers";

const CLIENT_ID =
  "259508142133-qnaske17og39uoc38ub3ebp5i0ijhfu7.apps.googleusercontent.com";
const DEVELOPER_KEY = "AIzaSyBnSlCHuwnONdhxdHWk-Ax1zm3f119fnVc";

const SCOPE = ["https://www.googleapis.com/auth/drive.readonly"];

const ExampleGoogleChooser = () => {
  const multiselect = true;
  const navHidden = true;
  return (
    <GoogleChooser
      clientId={CLIENT_ID}
      developerKey={DEVELOPER_KEY}
      scope={SCOPE}
      success={files => console.log("onSucces", files)}
      multiselect={multiselect}
      navHidden={navHidden}
      authImmediate={false}
      extensions={[
        EXTENSION_COMMON.PDF,
        EXTENSION_COMMON.DOC,
        EXTENSION_COMMON.DOCX,
        EXTENSION_COMMON.CSV
      ]}
    >
      <span>Click me DRIVE!</span>
    </GoogleChooser>
  );
};

export default ExampleGoogleChooser;
