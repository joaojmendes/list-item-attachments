import * as React from 'react';
import styles from './TestControl.module.scss';
import { ITestControlProps } from './ITestControlProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ListItemAttachments } from '../../../controls/listItemAttachments';

export default class TestControl extends React.Component<ITestControlProps, {}> {
  constructor(props: ITestControlProps) {
    super(props);
  }


  public render(): React.ReactElement<ITestControlProps> {
    return (
      <div className={styles.testControl}>
        <div className={styles.container}>
          <div className={styles.title}>List-Item-Attachments</div>
          <div className={styles.subTitle}>ListId: dfa283f4-5faf-4d54-b6b8-5bcaf2725af5</div>
          <div className={styles.subTitle}>ItemId: 1 </div>
          <ListItemAttachments
            listId='dfa283f4-5faf-4d54-b6b8-5bcaf2725af5'
            itemId={1}
            context={this.props.context}
          />
        </div>
      </div>
    );
  }
}
