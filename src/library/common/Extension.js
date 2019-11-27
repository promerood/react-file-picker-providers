const EXTENSIONS = {
  DROPBOX: {
    PDF: ".pdf",
    DOC: ".doc",
    DOCX: ".docx",
    XLS: ".xls",
    XLSX: ".xlsx",
    PPT: ".ppt",
    PPTX: ".pptx",
    JPG: ".jpg",
    JPE: "jpe",
    JPEG: ".jpeg",
    PNG: ".png",
    BMP: ".bmp",
    GIF: ".gif",
    TIFF: ".tiff",
    TIF: ".tif",
    RTF: ".rtf",
    CSV: ".csv"
  },
  GOOGLE_DRIVE: {
    PDF: "application/pdf",
    DOC: "application/msword",
    DOCX:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    XLS: "application/excel",
    XLSX: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    PPT: "application/mspowerpoint",
    PPTX:
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    JPG: "image/jpg",
    JPE: "image/jpe",
    JPEG: "image/jpeg",
    PNG: "image/png",
    BMP: "image/bmp",
    GIF: "image/gif",
    TIFF: "image/tiff",
    TIF: "image/tif",
    RTF: "image/rtf",
    CSV: "text/csv"
  }
};

export const getExtensions = (provider, extensions) => {
  const ext = [];
  if (extensions) {
    extensions.forEach(e => {
      if (EXTENSIONS[provider][e]) {
        ext.push(EXTENSIONS[provider][e]);
      } else {
        console.warn(`Extension NOT available '${e}' to: ${provider} provider`);
      }
    });
  }
  return ext;
};
