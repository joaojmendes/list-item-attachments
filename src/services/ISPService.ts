

export enum LibsOrderBy {
    Id = 1,
    Title
}

/**
 * Options used to sort and filter
 */
export interface ILibsOptions {
    orderBy?: LibsOrderBy;
    baseTemplate?: number;
    includeHidden?: boolean;
}

export interface ISPService {
  
    getListItems?(filterText: string, listId: string, internalColumnName: string, webUrl?: string) : Promise<any[]>;
}
