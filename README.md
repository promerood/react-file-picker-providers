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

Simple react wrapper for: 
- [Dropbox Chooser API](https://www.dropbox.com/developers/chooser)
- [Google Drive (DOCs)](https://console.developers.google.com)
- [OneDrive]- In-Progress DEV.

Installation 
===
```
npm install react-file-picker-providers
```


Usage Dropbox
=====
```
import { DropboxChooser, EXTENSION_COMMON } from 'react-file-picker-providers';

...
...

<DropboxChooser 
    appKey={'your-uniq-app-key'}
    success={files => console.log('onSucces', files)}
    cancel={() => this.onCancel()}
    multiselect={true}
    extensions={[
        EXTENSION_COMMON.PDF,
        EXTENSION_COMMON.DOC,
        EXTENSION_COMMON.DOCX,
        EXTENSION_COMMON.XLS
      ]} >
    <div className="dropbox-button">Click me!</div>        
</DropboxChooser>
```

Usage Google Drive
=====
```
import { GoogleChooser , EXTENSION_COMMON} from 'react-file-picker-providers';

...
...

<GoogleChooser
      clientId={'your client id here'}
      developerKey={'your dev key here'}
      success={files => console.log('onSucces', files)}
      multiselect={true}
      navHidden={true}
      authImmediate={false}
      extensions={[
        EXTENSION_COMMON.PDF,
        EXTENSION_COMMON.DOC,
        EXTENSION_COMMON.DOCX,
        EXTENSION_COMMON.XLS
      ]}
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

Allowed extensions:
=====
```
    EXTENSION_COMMON.PDF
    EXTENSION_COMMON.DOC
    EXTENSION_COMMON.DOCX
    EXTENSION_COMMON.XLS
    EXTENSION_COMMON.XLSX
    EXTENSION_COMMON.PPT
    EXTENSION_COMMON.PPTX
    EXTENSION_COMMON.JPG
    EXTENSION_COMMON.JPE
    EXTENSION_COMMON.JPEG
    EXTENSION_COMMON.PNG
    EXTENSION_COMMON.BMP
    EXTENSION_COMMON.GIF
    EXTENSION_COMMON.TIFF
    EXTENSION_COMMON.TIF
    EXTENSION_COMMON.RTF
    EXTENSION_COMMON.CSV
```

Author
=====
Pablo David Romero
pablo.romeropablo@gmail.com
