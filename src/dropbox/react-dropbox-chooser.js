import React, { Component } from 'react';
import PropTypes from 'prop-types';
import loadScript from 'load-script';
import { Success } from '../commonClass/Success';

const DROPBOX_SDK_URL = 'https://www.dropbox.com/static/api/2/dropins.js';
const SCRIPT_ID = 'dropboxjs';

let scriptLoadingStarted = false;

// read more
// https://www.dropbox.com/developers/chooser
export default class DropboxChooser extends Component {

  constructor(props) {
    super(props);

    this.onChoose = this.onChoose.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
  }

  componentDidMount() {
    if (!this.isDropboxReady() && !scriptLoadingStarted) {
      scriptLoadingStarted = true;
      loadScript(DROPBOX_SDK_URL, {
        attrs: {
          id: SCRIPT_ID,
          'data-app-key': this.props.appKey
        }
      });
    }
  }

  onSuccess(filesSelectedUser) {
    const { success } = this.props;
    let resp = [];

    //THE MAPPING BETWEEN THE PROVIDER'S RESPONSE AND THE OBJECT OF SUCCESS  
    filesSelectedUser.forEach(filesSelectedUser => {
      resp.push(new Success(filesSelectedUser.id,
        filesSelectedUser.name,
        filesSelectedUser.bytes,
        filesSelectedUser.link));
    });

    if (success) {
      success(resp);
    }
  }


  isDropboxReady() {
    return !!window.Dropbox;
  }

  onChoose() {
    if (!this.isDropboxReady() || this.props.disabled) {
      return null;
    }

    const {
      cancel,
      linkType,
      multiselect,
      extensions
    } = this.props;

    window.Dropbox.choose({
      success: this.onSuccess,
      cancel,
      linkType,
      multiselect,
      extensions
    });
  }



  render() {
    return (
      <div onClick={this.onChoose}>
        {
          this.props.children ?
            this.props.children :
            <button>Open dropbox chooser</button>
        }
      </div>
    );
  }
}

DropboxChooser.propTypes = {
  children: PropTypes.node,
  appKey: PropTypes.string.isRequired,
  success: PropTypes.func.isRequired,
  cancel: PropTypes.func,
  linkType: PropTypes.oneOf(['preview', 'direct']),
  multiselect: PropTypes.bool,
  extensions: PropTypes.arrayOf(PropTypes.string),
  disabled: PropTypes.bool
};

DropboxChooser.defaultProps = {
  cancel: () => { },
  linkType: 'preview',
  multiselect: false,
  disabled: false
};