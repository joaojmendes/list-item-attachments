declare interface IControlStrings {
  ListItemPickerSelectValue: string;
  genericNoResultsFoundText: string;
}

declare module 'ControlStrings' {
  const strings: IControlStrings;
  export = strings;
}
