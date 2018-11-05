# List-Item-Attachments control

This control allows you to manage list Item Attachments, you can add or delete associated attachments, the attachments are listed in tile view.
 

Here is an example of the control:

![ListItemAttachments Tiles](./assets/ListItemAttachmentsTitles.png)

![ListItemAttachments Confirm Delete](./assets/ListItemAttachmentDeleteConfirm.png)

![ListItemAttachments Attachment Deleted ](./assets/ListItemAttachementDeletedMsg.png)

## How to use this control in your solutions

- Check that you installed the `@pnp/spfx-controls-react` dependency. Check out the [getting started](../#getting-started) page for more information about installing the dependency.
- Import the control into your component:

```TypeScript
 
import { ListItemAttachments } from '@pnp/spfx-controls-react/listItemAttachments';
```
- Use the `ListItemAttachments` control in your code as follows:

```TypeScript
          <ListItemAttachments
            listId='dfa283f4-5faf-4d54-b6b8-5bcaf2725af5'
            itemId={1}
            context={this.props.context}
            disabled={false}
          />
```

## Implementation

The `ListItemPicker` control can be configured with the following properties:

<table style="width: 100%; height: 786px;">
<tbody>
<tr>
<th style="width: 220px;">Property</th>
<th>Type</th>
<th style="width: 85px;">Required</th>
<th>Description</th>
</tr>
<tr>
<td>listId</td>
<td>string</td>
<td>yes</td>
<td>Gui of List</td>
</tr>
<tr>
<td>itemId</td>
<td>string</td>
<td>yes</td>
<td>List Item Id</td>
</tr>
<tr>
<td>webUrl</td>
<td>string</td>
<td>no</td>
<td>URL of site if different of current site, user must have permissions</td>
</tr>
<tr>
<td>disabled</td>
<td>Boolean</td>
<td>no</td>
<td>Disable Control</td>
</tr>
<tr>
<td>context</td>
<td>WebPartContext|ApplicationCustomizerContext</td>
<td>yes</td>
<td>WebPart or Application customiser context</td>
</tr>
</tbody>
</table>		


![](https://telemetry.sharepointpnp.com/sp-dev-fx-controls-react/wiki/controls/ListItemPicker)
