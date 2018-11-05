import * as React from 'react';
import * as $ from 'jquery';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, } from 'office-ui-fabric-react/lib/Button';
import { CommandButton } from 'office-ui-fabric-react/lib/Button';
import { IUploadAttachmentProps } from './IUploadAttachmentProps';
import { IUploadAttachmentState } from './IUploadAttachmentState';
import styles from './UploadAttachment.module.scss';
import SPservice from "../../services/SPservice";
import * as strings from 'ControlStrings';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';

export class UploadAttachment extends React.Component<IUploadAttachmentProps, IUploadAttachmentState> {
  private _spservice: SPservice;

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
    // Handlers
    this._closeDialog = this._closeDialog.bind(this);
  }
  //  FileReader event
  private _onAttachmentUpload(e) {
    e.preventDefault();
    //
    $('#file-picker').trigger('click');
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
            dialogMessage: strings.uploadAttachmentErrorMsg.replace('{0}', file.name).replace('{1}', reason)
          });
        });
    };
    reader.readAsDataURL(file);
  }
  // Render
  public render() {

    return (

      <div className={styles.UploadAttachment}>
        <input id="file-picker" style={{ display: 'none' }} type="file" onChange={(e) => this._addAttachment(e)} />

        <div style={{ textAlign: 'left', marginTop: 25, marginBottom: 25 }}>
          <CommandBar
            items={[{
              key: 'Add',
              name: strings.CommandBarAddAttachmentLabel,
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
            this.state.isLoading ? <ProgressIndicator label="Uploading File..." /> : ""
          }
        </div>
        <Dialog
          isOpen={this.state.showDialog}
          type={DialogType.normal}
          onDismiss={this._closeDialog}
          title={strings.uploadAttachmentDialogTitle}
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
