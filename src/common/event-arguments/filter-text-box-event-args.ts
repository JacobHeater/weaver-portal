export class FilterTextBoxEventArgs<T extends HTMLElement> {
  regexEnabled: boolean = false;
  caseSensitive: boolean = false;
  filterValue: string = '';
  target: T | null = null;
};
