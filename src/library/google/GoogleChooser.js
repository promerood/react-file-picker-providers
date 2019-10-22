import React from "react";
import PropTypes from "prop-types";
import loadScript from "load-script";
import { Success } from "../common/Success";
import { getExtensions } from "../common/Extension";
import { PROVIDERS } from "../constants";

const GOOGLE_SDK_URL = "https://apis.google.com/js/api.js";
const GOOGLE_URL_FILES =
  "https://www.googleapis.com/drive/v2/files/{fileId}?alt=media";

let scriptLoadingStarted = false;

class GoogleChooser extends React.Component {
  constructor(props) {
    super(props);

    this.onApiLoad = this.onApiLoad.bind(this);
    this.onChoose = this.onChoose.bind(this);
  }

  componentDidMount() {
    if (this.isGoogleReady()) {
      // google api is already exists
      // init immediately
      this.onApiLoad();
    } else if (!scriptLoadingStarted) {
      // load google api and the init
      scriptLoadingStarted = true;
      loadScript(GOOGLE_SDK_URL, this.onApiLoad);
    }
  }

  onChoose() {
    const { disabled, onAuthFailed } = this.props;
    if (
      !this.isGoogleReady() ||
      !this.isGoogleAuthReady() ||
      !this.isGooglePickerReady() ||
      disabled
    ) {
      return;
    }

    const token = window.gapi.auth.getToken();
    const oauthToken = token && token.access_token;

    if (oauthToken) {
      this.createPicker(oauthToken);
    } else {
      this.doAuth(response => {
        if (response.access_token) {
          this.createPicker(response.access_token);
        } else {
          onAuthFailed(response);
        }
      });
    }
  }

  onApiLoad = () => {
    window.gapi.load("auth");
    window.gapi.load("picker");
  };

  isGoogleReady = () => {
    return !!window.gapi;
  };

  isGoogleAuthReady = () => {
    return !!window.gapi.auth;
  };

  isGooglePickerReady = () => {
    return !!window.google.picker;
  };

  onSelectedFiles = data => {
    const { success } = this.props;

    if (data.action === window.google.picker.Action.PICKED) {
      const promiseList = [];
      const token = window.gapi.auth.getToken();
      const oauthToken = token && token.access_token;
      const headers = {
        method: "GET",
        headers: {
          Authorization: "Bearer ".concat(oauthToken)
        }
      };

      data.docs.forEach(doc => {
        promiseList.push(this.getRequestFile(headers, doc));
      });

      Promise.all(promiseList)
        .then(files => {
          if (success) {
            success(files);
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  getRequestFile = async (headers, doc) => {
    const { id: fileId, name: fileName, sizeBytes } = doc;

    // THE MAPPING BETWEEN THE PROVIDER'S
    // RESPONSE AND THE OBJECT OF SUCCESS
    const fileBlob = await fetch(
      GOOGLE_URL_FILES.replace("{fileId}", fileId),
      headers
    )
      .then(response => {
        if (response.ok) {
          return response.blob();
        }
        return null;
      })
      .then(dataBlob => {
        dataBlob.lastModifiedDate = new Date();
        dataBlob.name = fileName;
        const file = new Success(
          fileId,
          fileName,
          sizeBytes,
          null,
          PROVIDERS.GDRIVE,
          dataBlob
        );
        return file;
      })
      .catch(error => {
        console.error(error);
      });

    return fileBlob;
  };

  doAuth(callback) {
    const { clientId, scope, authImmediate } = this.props;
    window.gapi.auth.authorize(
      {
        client_id: clientId,
        scope,
        immediate: authImmediate
      },
      callback
    );
  }

  createPicker(oauthToken) {
    const {
      onAuthenticate,
      createPicker,
      viewId,
      extensions,
      query,
      developerKey,
      origin,
      navHidden,
      multiselect
    } = this.props;

    onAuthenticate(oauthToken);

    if (createPicker) {
      return createPicker(window.google, oauthToken);
    }

    const googleViewId = window.google.picker.ViewId[viewId];
    const view = new window.google.picker.View(googleViewId);

    if (extensions) {
      const ext = getExtensions(PROVIDERS.GDRIVE, extensions);
      view.setMimeTypes(ext.join(","));
    }

    if (query) {
      view.setQuery(query);
    }

    if (!view) {
      throw new Error("Can't find view by viewId");
    }

    const picker = new window.google.picker.PickerBuilder()
      .addView(view)
      .setOAuthToken(oauthToken)
      .setDeveloperKey(developerKey)
      .setCallback(this.onSelectedFiles);

    if (origin) {
      picker.setOrigin(origin);
    }

    if (navHidden) {
      picker.enableFeature(window.google.picker.Feature.NAV_HIDDEN);
    }

    if (multiselect) {
      picker.enableFeature(window.google.picker.Feature.MULTISELECT_ENABLED);
    }

    picker.build().setVisible(true);

    return null;
  }

  render() {
    const { children } = this.props;
    return (
      <div onClick={this.onChoose}>
        {children || <div>Open google chooser</div>}
      </div>
    );
  }
}

GoogleChooser.propTypes = {
  children: PropTypes.node,
  clientId: PropTypes.string.isRequired,
  developerKey: PropTypes.string.isRequired,
  scope: PropTypes.array,
  viewId: PropTypes.string,
  authImmediate: PropTypes.bool,
  origin: PropTypes.string,
  success: PropTypes.func.isRequired,
  onAuthenticate: PropTypes.func,
  onAuthFailed: PropTypes.func,
  createPicker: PropTypes.func,
  multiselect: PropTypes.bool,
  navHidden: PropTypes.bool,
  disabled: PropTypes.bool,
  extensions: PropTypes.array,
  query: PropTypes.string
};

GoogleChooser.defaultProps = {
  children: null,
  onAuthenticate: () => {},
  onAuthFailed: () => {},
  scope: ["https://www.googleapis.com/auth/drive"],
  viewId: "DOCS",
  authImmediate: false,
  origin: null,
  multiselect: false,
  createPicker: null,
  navHidden: false,
  disabled: false,
  extensions: [],
  query: ""
};

export default GoogleChooser;
