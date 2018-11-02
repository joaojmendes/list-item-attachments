import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, } from 'office-ui-fabric-react/lib/Button';
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
import SPservice from "../../services/SPservice";
import { TooltipHost, DirectionalHint } from 'office-ui-fabric-react/lib/Tooltip';
// Links to Icons
export const DOCICONURL_XLSX = "https://spoprod-a.akamaihd.net/files/fabric/assets/item-types/96/xlsx.png";
export const DOCICONURL_DOCX = "https://spoprod-a.akamaihd.net/files/fabric/assets/item-types/96/docx.png";
export const DOCICONURL_PPTX = "https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/pptx_16x3.png";
export const DOCICONURL_MPPX = "https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/mppx_16x3.png";
export const DOCICONURL_PHOTO = "https://sonaesystems.sharepoint.com/sites/prm/HtmlWebParts/raidiDetail/build/static/css/PHOTO.png";
export const DOCICONURL_PDF = "https://sonaesystems.sharepoint.com/sites/prm/HtmlWebParts/raidiDetail/build/static/css/PDF.png";
export const DOCICONURL_TXT = "https://sonaesystems.sharepoint.com/sites/prm/HtmlWebParts/raidiDetail/build/static/css/TXT.png";

export class ListItemAttachments extends React.Component<IListItemAttachmentsProps, any> {
  private _spservice: SPservice;
  private previewImages: IDocumentCardPreviewImage[];

  constructor(props: IListItemAttachmentsProps) {
    super(props);
    this.state = {
      file: '',
      showDialog: false,
      dialogMessage: '',
      Documents: []
    };

    // Get SPService Factory
    this._spservice = new SPservice(this.props.context);
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
      let files = await this._spservice.getListItemAttachments(this.props.listId, this.props.itemId);
      console.log(`nr files ${files.length}`);
      for (const _file of files) {
        let _iconUrl = '';
        let _fileTypes = _file.ServerRelativeUrl.split('.');
        let _fileExtention = _fileTypes[1];

        switch (_fileExtention) {
          case 'xlsx':
            _iconUrl = DOCICONURL_XLSX;
            break;
          case 'docx':
            _iconUrl = DOCICONURL_DOCX;
            break;
          case 'pptx':
            _iconUrl = DOCICONURL_PPTX;
            break;
          case 'TXT':
            _iconUrl = '';
            break;
          case 'MPPX':
            _iconUrl = DOCICONURL_MPPX;
            break;
          case 'PDF':
            _iconUrl = DOCICONURL_PDF;
            break;
          case 'TXT':
            _iconUrl = DOCICONURL_TXT;
            break;
          case 'jpg':
            _iconUrl = DOCICONURL_PHOTO;
            break;
          case 'png':
            _iconUrl = DOCICONURL_PHOTO;
            break;
          case 'gif':
            _iconUrl = DOCICONURL_PHOTO;
            break;
          default:
            _iconUrl = DOCICONURL_DOCX;
            break;
        }
        console.log(`IconURL: ${_iconUrl}`);

        this.previewImages.push({
          name: _file.FileName,
          previewImageSrc: _iconUrl,
          iconSrc: '',
          imageFit: ImageFit.center,
          width: 187,
          height: 130,

        });
        console.dir(this.previewImages);
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
        dialogMessage: 'Error on read file Attachments. Error: ' + error.message
      });
    }
  }

  // Run befor render component
  public componentDidMount() {
    this._loadAttachments();
  }

  // Render Attachments
  public render() {
    return (
      <div style={styles.ListItemAttachments}>
        {this.state.Documents.map((_file: any, i: number) => {
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
                  <Label style={{ marginLeft: 12, marginRight: 12, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                    {_file.FileName}
                  </Label>
                  <DocumentCardActions
                    actions={
                      [
                        {
                          iconProps: {
                            iconName: 'Delete',
                            title: 'Delete',
                            style: { 'float': 'right' }
                          },
                          title: 'Delete',
                          text: 'Delete',
                          disabled: this.props.disabled,
                          className: this.props.disabled ? 'documentAction-disabled' : 'documentAction',
                          onClick: (ev: any) => {
                            ev.preventDefault();
                            ev.stopPropagation();

                            this._onDeleteAttachment(_file.FileName);
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
        <Dialog
          isOpen={this.state.showDialog}
          type={DialogType.normal}
          onDismiss={this._closeDialog}
          title="Attachments"
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
  private _closeDialog(e: any) {
    //
    e.preventDefault();
    this.setState({
      showDialog: false,
      dialogMessage: '',
    });
  }

  // On UploadFIle
  private _onUploadFile(file: any) {
    //
    this._loadAttachments();
  }
  private _onDeleteAttachment(_file: any) {

    // Delete Attachment
    this._spservice.deleteAttachment(_file, this.props.listId, this.props.itemId, this.props.webUrl)
      .then(() => {
        this.setState({
          showDialog: true,
          dialogMessage: 'File ' + _file + ' Deleted.',
        });
        this._loadAttachments();
      })
      .catch((reason: any) => {
        this.setState({
          showDialog: true,
          // tslint:disable-next-line:max-line-length
          dialogMessage: 'Error on delete file: ' + _file + ' Error: ' + reason
        });
      });

  }

}
export default ListItemAttachments;
