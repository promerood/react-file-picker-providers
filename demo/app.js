import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import {DropboxChooser, GoogleChooser} from '../dist/index';
// import GooglePicker from '../dist/drive/react-google-picker';

const APP_KEY = '158dtt39zf0zj9k';


const CLIENT_ID = '206339496672-eie1j7vvr0plioslt41l2qsddmdjloqj.apps.googleusercontent.com';
const DEVELOPER_KEY = 'AIzaSyChPXI8ByCl68kcpy0zwjrfjEc_8mtwH_w';
const SCOPE = ['https://www.googleapis.com/auth/drive.readonly'];

function App() {
  return (
    <div className="container">
      <DropboxChooser appKey={APP_KEY}
                      success={files => console.log('chose:', files)}
                      cancel={() => console.log('closed')}
                      multiselect={true} 
                      extensions={['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.jpg', 'jpe', '.jpeg', '.png', '.bmp', '.gif', '.tiff', '.tif', '.rtf']}>
        <span>Click me!</span>
        <div className="dropbox"></div>
      </DropboxChooser>
            
      <hr/>

      <GoogleChooser clientId={CLIENT_ID}
                    developerKey={DEVELOPER_KEY}
                    scope={SCOPE}
                    successs={files => console.log('on change:', files)}
                    onAuthFailed={data => console.log('on auth failed:', data)}
                    multiselect={true}
                    navHidden={true}
                    authImmediate={false}
                    mimeTypes={['image/png', 'image/jpeg', 'image/pjpeg', 'image/jpeg', 'image/jpg', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/mspowerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'image/bmp', 'image/gif', 'image/tiff', 'image/tif']}
                    viewId={'DOCS'}>
        <span>Click me!</span>
        <div className="google"></div>
      </GoogleChooser>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));