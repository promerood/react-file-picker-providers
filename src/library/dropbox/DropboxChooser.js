import React, { Component } from "react";
import PropTypes from "prop-types";
import loadScript from "load-script";
import { Success } from "../common/Success";
import { getExtensions } from "../common/Extension";
import { PROVIDERS } from "../constants";

const DROPBOX_SDK_URL = "https://www.dropbox.com/static/api/2/dropins.js";
const SCRIPT_ID = "dropboxjs";

let scriptLoadingStarted = false;

// read more
// https://www.dropbox.com/developers/chooser
class DropboxChooser extends Component {
  constructor(props) {
    super(props);

    this.onChoose = this.onChoose.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.isDropboxReady = this.isDropboxReady.bind(this);
  }

  componentDidMount() {
    if (!this.isDropboxReady() && !scriptLoadingStarted) {
      scriptLoadingStarted = true;
      const { appKey } = this.props;
      loadScript(DROPBOX_SDK_URL, {
        attrs: {
          id: SCRIPT_ID,
          "data-app-key": appKey
        }
      });
    }
  }

  async onSuccess(filesSelectedUser) {
    const { success } = this.props;
    const resp = [];

    // THE MAPPING BETWEEN THE PROVIDER'S
    // RESPONSE AND THE OBJECT OF SUCCESS
    const promises = [];
    filesSelectedUser.forEach(file => {
      promises.push(
        fetch(file.link)
          .then(res => res.blob()) // Gets the response and returns it as a blob
          .then(blob => {
            return blob;
          })
      );
    });

    const proALL = await Promise.all(promises);

    proALL.forEach((file, index) => {
      resp.push(
        new Success(
          filesSelectedUser[index].id,
          filesSelectedUser[index].name,
          filesSelectedUser[index].bytes,
          null,
          PROVIDERS.DROPBOX,
          file
        )
      );
    });

    if (success) {
      success(resp);
    }
  }

  onChoose = () => {
    const { disabled, extensions } = this.props;
    if (!this.isDropboxReady() || disabled) {
      return null;
    }

    const { cancel, linkType, multiselect } = this.props;

    window.Dropbox.choose({
      success: this.onSuccess,
      cancel,
      linkType,
      multiselect,
      extensions: getExtensions(PROVIDERS.DROPBOX, extensions)
    });

    return null;
  };

  isDropboxReady = () => {
    return !!window.Dropbox;
  };

  render = () => {
    const { children } = this.props;
    return (
      <div onClick={this.onChoose}>
        {children || <button type="button"> Open dropbox chooser </button>}
      </div>
    );
  };
}

DropboxChooser.propTypes = {
  children: PropTypes.node,
  appKey: PropTypes.string.isRequired,
  success: PropTypes.func.isRequired,
  cancel: PropTypes.func,
  linkType: PropTypes.oneOf(["preview", "direct"]),
  multiselect: PropTypes.bool,
  extensions: PropTypes.arrayOf(PropTypes.string),
  disabled: PropTypes.bool
};

DropboxChooser.defaultProps = {
  children: null,
  cancel: () => {},
  linkType: "direct",
  multiselect: false,
  disabled: false,
  extensions: []
};

export default DropboxChooser;
