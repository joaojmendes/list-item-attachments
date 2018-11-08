declare interface IControlStrings {
  ListItemAttachmentsActionDeleteIconTitle: string;
  ListItemAttachmentsactionDeleteTitle: string;
  ListItemAttachmentsfileDeletedMsg: string;
  ListItemAttachmentsfileDeleteError: string;
  ListItemAttachmentserrorLoadAttachments: string;
  ListItemAttachmentsconfirmDelete: string;
  ListItemAttachmentsdialogTitle: string;
  ListItemAttachmentsdialogOKbuttonLabel: string;
  ListItemAttachmentsdialogCancelButtonLabel: string;
  ListItemAttachmentsdialogOKbuttonLabelOnDelete: string;
  ListItemAttachmentsuploadAttachmentDialogTitle:string;
  ListItemAttachmentsuploadAttachmentButtonLabel:string;
  ListItemAttachmentsuploadAttachmentErrorMsg: String;
  ListItemAttachmentsCommandBarAddAttachmentLabel: string;
  ListItemAttachmentsloadingMessage: string;

}

declare module 'ControlStrings' {
  const strings: IControlStrings;
  export = strings;
}
