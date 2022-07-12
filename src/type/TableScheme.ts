import JsStore from 'jsstore';
export interface TableScheme {
  name: string;
  columns: {
    [key: string]: {
      primaryKey?: true;
      notNull?: boolean;
      dataType?: JsStore.DATA_TYPE;
      autoIncrement?: boolean;
      unique?: boolean;
      default?: any;
      multiEntry?: boolean;
      enableSearch?: boolean;
      keyPath?: string[];
    };
  };
}
