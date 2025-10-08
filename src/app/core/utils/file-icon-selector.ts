const fileExtensions = [
  {
    extension: '.pdf',
    icon: '../../../assets/images/icon/pdf-document-svgrepo-com.svg',
  },
  {
    extension: '.doc',
    icon: '../../../assets/images/icon/word-document-svgrepo-com.svg',
  },
  {
    extension: '.docx',
    icon: '../../../assets/images/icon/word-document-svgrepo-com.svg',
  },
  {
    extension: '.xls',
    icon: '../../../assets/images/icon/excel-document-svgrepo-com.svg',
  },
  {
    extension: '.xlsx',
    icon: '../../../assets/images/icon/excel-document-svgrepo-com.svg',
  },
  {
    extension: '.txt',
    icon: '../../../assets/images/icon/file-svgrepo-com.svg',
  },
  {
    extension: '.ppt',
    icon: '../../../assets/images/icon/file-svgrepo-com.svg',
  },
  {
    extension: '.pptx',
    icon: '../../../assets/images/icon/file-svgrepo-com.svg',
  },
  {
    extension: '.vnd.openxmlformats-officedocument.wordprocessingml.document',
    icon: '../../../assets/images/icon/word-document-svgrepo-com.svg',
  },
];

export const fileIconSelector = (fileName: string): string => {
  const file = fileExtensions.find((f) => fileName.endsWith(f.extension));
  return file ? file.icon : '../../../assets/images/icon/file-svgrepo-com.svg';
};
