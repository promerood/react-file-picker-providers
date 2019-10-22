React File Providers chooser - Wrapper
============
Demo 
====
```
npm install
npm start
open http://localhost:3000
```

============

Simple react wrapper for [Dropbox Chooser API](https://www.dropbox.com/developers/chooser)

Installation 
===
```
npm install react-file-picker-providers
```


Usage Dropbox
=====
```
import { DropboxChooser } from 'react-file-picker-providers';

...
...

<DropboxChooser 
    appKey={'your-uniq-app-key'}
    success={files => console.log('onSucces', files)}
    cancel={() => this.onCancel()}
    multiselect={true}
    extensions={['PNG', 'JPG', 'PDF', 'DOC']} >
    <div className="dropbox-button">Click me!</div>        
</DropboxChooser>
```

Usage Google Drive
=====
```
import { GoogleChooser } from 'react-file-picker-providers';

...
...

<GoogleChooser
      clientId={'your client id here'}
      developerKey={'your dev key here'}
      success={files => console.log('onSucces', files)}
      multiselect={true}
      navHidden={true}
      authImmediate={false}
      extensions={['PNG', 'JPG', 'PDF', 'DOC']}
    >
      <span>Click me DRIVE!</span>

    </GoogleChooser>
```

Usage Google OneDrive
=====
```
example code here
```
in progress dev

Allowed extensions
=====
```
    PDF
    DOC
    DOCX
    XLS
    XLSX
    PPT
    PPTX
    JPG
    JPE
    JPEG
    PNG
    BMP
    GIF
    TIFF
    TIF
    RTF
```

Author
=====
Pablo David Romero
pablo.romeropablo@gmail.com
