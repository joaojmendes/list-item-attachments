import {IListItemAttachmentFile } from './IListItemAttachmentFile';
export interface IListItemAttachmentsState {
      file: IListItemAttachmentFile;
      showDialog: boolean;
      dialogMessage: string;
      Documents: IListItemAttachmentFile[];
      deleteAttachment: boolean;
      disableButton: boolean;
}
