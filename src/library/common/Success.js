export class Success {
  constructor(fileId, fileName, fileSize, urlDownload, providers, fileBlob) {
    this.fileId = fileId;
    this.fileName = fileName;
    this.fileSize = fileSize;
    if (urlDownload) {
      this.urlDownload = urlDownload;
    }
    this.provider = providers;
    if (fileBlob) {
      this.fileBlob = fileBlob;
    }
  }
}
