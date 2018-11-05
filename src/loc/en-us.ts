import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";

declare var define: any;
define([], () => {
  return {
    actionDeleteIconTitle: 'Delete',
    actionDeleteTitle: 'Delete',
    fileDeletedMsg: 'File {0}  Deleted',
    fileDeleteError: 'Error on delete file: {0} , error {1}',
    errorLoadAttachments: 'Error on load list item attachement, error: {0}',
    confirmDelete: 'are you sure you want send the attachment  {0} to the site recycle bin ?',
    dialogTitle: 'List Item Attachment',
    dialogOKbuttonLabel: 'OK',
    dialogCancelButtonLabel: 'Cancel',
    dialogOKbuttonLabelOnDelete: 'Delete',
    uploadAttachmentDialogTitle: 'Add Attchment',
    uploadAttachmentButtonLabel: 'Add Attachment',
    uploadAttachmentErrorMsg: 'The file {0} was not attached, reason: {1}',
    CommandBarAddAttachmentLabel: 'Add Attachment'
  };
});
