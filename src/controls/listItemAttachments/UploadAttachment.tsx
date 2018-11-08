import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, } from 'office-ui-fabric-react/lib/Button';
import { CommandButton } from 'office-ui-fabric-react/lib/Button';
import { IUploadAttachmentProps } from './IUploadAttachmentProps';
import { IUploadAttachmentState } from './IUploadAttachmentState';
import SPservice from "../../services/SPService";
import * as strings from 'ControlStrings';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import * as $ from 'jquery';
import { createRef } from '@uifabric/utilities/lib';

export class UploadAttachment extends React.Component<IUploadAttachmentProps, IUploadAttachmentState> {
  private _spservice: SPservice;
  private fileInput;
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      showDialog: false,
      dialogMessage: '',
      isLoading: false
    };
    // Get SPService
    this._spservice = new SPservice(this.props.context);
    this.fileInput =  createRef();
    // Handlers
    this._closeDialog = this._closeDialog.bind(this);
    this._addAttachment = this._addAttachment.bind(this);
    this._onAttachmentUpload = this._onAttachmentUpload.bind(this);
  }
  //  FileReader event
  private _onAttachmentUpload(e) {
    e.preventDefault();
    // fire click event
    this.fileInput.current.value='';
    this.fileInput.current.click();
  //$('#file-picker').val('');
   // $('#file-picker').trigger('click');

    // document.getElementById('file-picker').click();
  }
  // Add Attachment
  private _addAttachment(e) {

    e.preventDefault();
    this.setState({
      isLoading: true
    });

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
      });
      // Add attachement
      this._spservice.addAttachment(this.props.listId, this.props.itemId, file.name, file, this.props.webUrl)
        .then(v => {
          this.setState({
            isLoading: false
          });
          this.props.onAttachmentUpload();
        })
        .catch((reason) => {
          this.setState({
            showDialog: true,
            isLoading: false,
            dialogMessage: strings.ListItemAttachmentsuploadAttachmentErrorMsg.replace('{0}', file.name).replace('{1}', reason)
          });
        });
    };
    reader.readAsDataURL(file);
  }
  // Render
  public render() {

    return (
      <div>
        <input id="file-picker"
               style={{ display: 'none' }}
               type="file"
               onChange={(e) => this._addAttachment(e)}
               ref={this.fileInput}
               />
        <div style={{ textAlign: 'left', marginTop: 25, marginBottom: 25 }}>
          <CommandBar
            items={[{
              key: 'Add',
              name: strings.ListItemAttachmentsCommandBarAddAttachmentLabel,
              iconProps: {
                iconName: 'Upload'
              },
              onClick: this._onAttachmentUpload,
              disabled: this.props.disabled
            }]}
          />
        </div>
        <div>
          {
            this.state.isLoading ? <ProgressIndicator label={strings.ListItemAttachmentsloadingMessage} /> : ""
          }
        </div>
        <Dialog
          isOpen={this.state.showDialog}
          type={DialogType.normal}
          onDismiss={this._closeDialog}
          title={strings.ListItemAttachmentsuploadAttachmentDialogTitle}
          subText={this.state.dialogMessage}
          isBlocking={true}>
          <DialogFooter>
            <PrimaryButton onClick={this._closeDialog}>OK</PrimaryButton>
          </DialogFooter>
        </Dialog>
      </div>
    );
  }
  // close dialog
  private _closeDialog(e) {
    e.preventDefault();
    this.setState({
      showDialog: false,
      dialogMessage: '',
    });
  }
}
export default UploadAttachment;