/* eslint-disable no-console */
import React from "react";
// eslint-disable-next-line import/no-unresolved
import { GoogleChooser } from "react-file-picker-providers";

const CLIENT_ID =
  "1020053081741-rl04fc2a7r7gpfoj09cb8537kfod661a.apps.googleusercontent.com";
const DEVELOPER_KEY = "AIzaSyDUBSUqp8XioMS0gx5reLXhBoASSUKSC3M";

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
      extensions={["PNG", "JPEG", "JPG", "PDF"]}
    >
      <span>Click me DRIVE!</span>
    </GoogleChooser>
  );
};

export default ExampleGoogleChooser;
