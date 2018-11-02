import { ISPService,  } from "./ISPService";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { sp, Web } from "@pnp/sp";

export default class SPService implements ISPService {

  constructor(private _context: WebPartContext | ApplicationCustomizerContext) {}
  /**
   * Get List Items
   */
  public async getListItems(filterText: string, listId: string, internalColumnName: string, webUrl?: string): Promise<any[]> {
    let returnItems: any[];

    try {

      const webAbsoluteUrl = !webUrl ? this._context.pageContext.web.absoluteUrl : webUrl;
      const apiUrl = `${webAbsoluteUrl}/_api/web/lists('${listId}')/items?$select=Id,${internalColumnName}&$filter=startswith(${internalColumnName},'${filterText}')`;
      const data = await this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
      if (data.ok) {
        const results = await data.json();
        if (results && results.value && results.value.length > 0) {
          return results.value;
        }
      }
      return [];
    } catch (error) {
      console.log(`Error get Items: ${error}`);
      return Promise.reject(error);
    }
  }


  // Get ListAttachments
  public async getListItemAttachments(
    listId: string,
    itemId: number,
    webUrl?: string
  ): Promise<any[]> {
    console.log("read attach");
    console.log(this._context.pageContext.web.absoluteUrl);
    let returnFiles: any[];
    let spWeb: Web;

      spWeb = new Web(this._context.pageContext.web.absoluteUrl);

    try {
      let files = await spWeb.lists
        .getById(listId)
        .items.getById(itemId)
        .attachmentFiles.get();
        console.log("Attachements metodo resolve files");
      return Promise.resolve(files);
    } catch (error) {
      console.dir(error);
      return Promise.reject(error);
    }
  }

  // delete attachement
  public async deleteAttachment(
    fileName: string,
    listId: string,
    itemId: number,
    webUrl?: string
  ): Promise<void> {
    let spWeb: Web;
    if (typeof webUrl === undefined) {
      spWeb = new Web(webUrl);
    } else {
      spWeb = new Web(this._context.pageContext.web.absoluteUrl);
    }
    try {
      await spWeb.lists
        .getById(listId)
        .items.getById(itemId)
        .attachmentFiles.getByName(fileName)
        .delete();
      return;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
