
export interface ISPService {
    /**
     * Get the list Items from SharePoint List
     * @param filterText  charaters used to filter column data during the API query
     * @param listId   GUID of List to query
     * @param internalColumnName   column to select data
     * @param webUrl   webUrl if not igual to actual web
     */

    getListItems?(filterText: string, listId: string, internalColumnName: string, webUrl?: string) : Promise<any[]>;
}
