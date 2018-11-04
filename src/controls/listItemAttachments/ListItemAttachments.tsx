
import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Icon, IconType } from 'office-ui-fabric-react/lib/Icon';
import { Label } from "office-ui-fabric-react/lib/Label";
import { Link } from 'office-ui-fabric-react/lib/Link';
import * as strings from 'ControlStrings';
import styles from './ListItemAttachments.module.scss';
import {
  DocumentCard,
  DocumentCardActions,
  DocumentCardPreview,
  DocumentCardTitle,
  IDocumentCardPreviewImage
} from 'office-ui-fabric-react/lib/DocumentCard';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import { IListItemAttachmentsProps } from './IListItemAttachmentsProps';
import { IListItemAttachmentsState } from './IListItemAttachmentsState';
import { IListItemAttachmentFile } from './IListItemAttachmentFile';
import SPservice from "../../services/SPservice";
import { TooltipHost, DirectionalHint } from 'office-ui-fabric-react/lib/Tooltip';
import utilities from '../../utilities/utilities';

export class ListItemAttachments extends React.Component<IListItemAttachmentsProps, IListItemAttachmentsState> {
  private _spservice: SPservice;
  private previewImages: IDocumentCardPreviewImage[];
  private _utilities: utilities;

  constructor(props: IListItemAttachmentsProps) {
    super(props);
    this.state = {
      file: null,
      showDialog: false,
      dialogMessage: '',
      Documents: [],
      deleteAttachment: false
    };

    // Get SPService Factory
    this._spservice = new SPservice(this.props.context);
    this._utilities = new utilities();

    // registo de event handlers
    //
    this._onDeleteAttachment = this._onDeleteAttachment.bind(this);
    this._closeDialog = this._closeDialog.bind(this);
    this._onUploadFile = this._onUploadFile.bind(this);
  }
  // Load Item Attachments
  private async _loadAttachments() {
    this.previewImages = [];
    try {
      const files: IListItemAttachmentFile[] = await this._spservice.getListItemAttachments(this.props.listId, this.props.itemId);
      for (const _file of files) {

        this.previewImages.push({
          name: _file.FileName,
          previewImageSrc: await this._utilities.GetFileImageUrl(_file),
          iconSrc: '',
          imageFit: ImageFit.center,
          width: 187,
          height: 130,
        });
        // console.dir(this.previewImages);
      }
      this.setState({
        showDialog: false,
        dialogMessage: '',
        Documents: files
      });
    }
    catch (error) {
      this.setState({
        showDialog: true,
        // tslint:disable-next-line:max-line-length
        dialogMessage: strings.errorLoadAttachments.replace('{0}', error.message)
      });
    }
  }
  //
  public componentDidMount() {
    this._loadAttachments();
  }

  // Render Attachments
  public render() {
    return (
      <div className={styles.ListItemAttachments}>
        {this.state.Documents.map((_file, i: number) => {
          return (
            <div className={styles.documentCardWrapper}>
              <TooltipHost
                content={_file.FileName}
                id="attach"
                calloutProps={{ gapSpace: 0, isBeakVisible: true }} closeDelay={200} directionalHint={DirectionalHint.rightCenter}>
                <DocumentCard
                  onClickHref={_file.ServerRelativeUrl}
                  className={styles.documentCard}>
                  <DocumentCardPreview previewImages={[this.previewImages[i]]} />
                  <Label className={styles.fileLabel}>
                    {_file.FileName}
                  </Label>
                  <DocumentCardActions
                    actions={
                      [
                        {
                          iconProps: {
                            iconName: 'Delete',
                            title: strings.actionDeleteIconTitle,
                          },
                          title: strings.actionDeleteTitle,
                          text: strings.actionDeleteTitle,
                          disabled: this.props.disabled,
                          onClick: (ev) => {
                            ev.preventDefault();
                            ev.stopPropagation();
                            this._onDeleteAttachment(_file);
                          }
                        },
                      ]
                    }
                  />
                </DocumentCard>
              </TooltipHost>
            </div>
          );
        })}
        {
          <Dialog
            isOpen={this.state.showDialog}
            type={DialogType.normal}
            onDismiss={this._closeDialog}
            title={strings.dialogTitle}
            subText={this.state.dialogMessage}
            isBlocking={true}>
            <DialogFooter>
              {
                this.state.deleteAttachment ? (<PrimaryButton onClick={this._closeDialog}>{strings.dialogOKbuttonLabelOnDelete}</PrimaryButton>) : ""
              }
              {
                this.state.deleteAttachment ? (<DefaultButton onClick={this._closeDialog}>{strings.dialogCancelButtonLabel}</DefaultButton>) : <PrimaryButton onClick={this._closeDialog}>{strings.dialogOKbuttonLabel}</PrimaryButton>
              }
            </DialogFooter>
          </Dialog>
        }
      </div>
    );
  }

  // close dialog
  private _closeDialog(e) {
    //
    e.preventDefault();
    this.setState({
      showDialog: false,
      dialogMessage: '',
      deleteAttachment: true,
    });
  }

  // On UploadFIle
  private _onUploadFile(file: any) {
    //
    this._loadAttachments();
  }
  private _onDeleteAttachment(_file: IListItemAttachmentFile) {
    this.setState({
      showDialog: true,
      deleteAttachment: true,
      file: _file,
      dialogMessage: strings.confirmDelete.replace('{0}', _file.FileName),
    });
  }


  /*
  *
  */
 private _onConfirmeDeleteAttachment() {
  // Delete Attachment
  const  _file  = this.state.file;
 this._spservice.deleteAttachment(_file.FileName, this.props.listId, this.props.itemId, this.props.webUrl)
    .then(() => {

      this.setState({
        showDialog: true,
        deleteAttachment: false,
        file: null,
        dialogMessage: strings.fileDeletedMsg.replace('{0}', _file.FileName),
      });
      this._loadAttachments();
    })
    .catch((reason) => {
      this.setState({
        showDialog: true,
        file: null,
        deleteAttachment: false,
        dialogMessage: strings.fileDeleteError.replace('{0}', _file.FileName).replace('{1}', reason)
      });
    });
}
}
export default ListItemAttachments;
