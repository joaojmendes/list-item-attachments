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
          <div className={styles.title}>ListItemPicker</div>

          <ListItemAttachments
            listId='da8daf15-d84f-4ab1-9800-7568f82fed2f'
            itemId={1}
            context={this.props.context}
          />
        </div>
      </div>
    );
  }
}
