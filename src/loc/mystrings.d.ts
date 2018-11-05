declare interface IControlStrings {
  actionDeleteIconTitle: string;
  actionDeleteTitle: string;
  fileDeletedMsg: string;
  fileDeleteError: string;
  errorLoadAttachments: string;
  confirmDelete: string;
  dialogTitle: string;
  dialogOKbuttonLabel: string;
  dialogCancelButtonLabel: string;
  dialogOKbuttonLabelOnDelete: string;
  uploadAttachmentDialogTitle:string;
  uploadAttachmentButtonLabel:string;
  uploadAttachmentErrorMsg: String;
  CommandBarAddAttachmentLabel: string;
}

declare module 'ControlStrings' {
  const strings: IControlStrings;
  export = strings;
}
