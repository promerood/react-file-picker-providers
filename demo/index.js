import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import DropboxChooser from '../';

const APP_KEY = 'o5hi587wqghboou';

function App() {
  return (
    <div className="container">
    
      <DropboxChooser appKey={APP_KEY}
                      success={files => console.log('chose:', files)}
                      cancel={() => console.log('closed')}
                      multiselect={true} >
        <span>Click me!</span>
        <div className="dropbox"></div>
      </DropboxChooser>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));