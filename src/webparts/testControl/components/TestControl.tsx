import * as React from 'react';
import styles from './TestControl.module.scss';
import { ITestControlProps } from './ITestControlProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ListItemPicker } from '../../../controls/listItemPicker';

export default class TestControl extends React.Component<ITestControlProps, {}> {
  constructor(props: ITestControlProps) {
    super(props);

    this.onSelectedItem = this.onSelectedItem.bind(this);
  }
  // Selected Item(s)
  private onSelectedItem(data: { key: string; name: string }[]) {
    for (const item of data) {
      console.log(`Item value: ${item.name}`);
    }
  }

  public render(): React.ReactElement<ITestControlProps> {
    return (
      <div className={styles.testControl}>
        <div className={styles.container}>
          <div className={styles.title}>ListItemPicker</div>

          <ListItemPicker
            listId='da8daf15-d84f-4ab1-9800-7568f82fed2f'
            columnInternalName='Title'
            itemLimit={2}
            onSelectedItem={this.onSelectedItem}
            context={this.props.context}
          />
        </div>
      </div>
    );
  }
}
