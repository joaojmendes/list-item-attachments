import { ISPService,  } from "./ISPService";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

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
}
