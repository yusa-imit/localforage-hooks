import { Scheme } from '../../type/Scheme';

export class Table {
  table: IDBObjectStore;
  /**
   * Constructor
   * @param db
   * @param tableName
   * @param scheme
   * @param options
   */
  constructor(
    db: IDBDatabase,
    tableName: string,
    scheme?: Scheme,
    options?: {
      keyPath?: string | string[] | null;
      autoIncrement?: boolean;
      uniqueIndexes?: Array<string>;
    }
  ) {
    this.table = db.createObjectStore(tableName, {
      autoIncrement: scheme ? false : options?.autoIncrement,
      keyPath: options?.keyPath,
    });
    if (scheme) {
      scheme.forEach(sch => {
        if (sch === options?.keyPath || options?.keyPath?.includes(sch)) return;
        this.table.createIndex(sch, sch, {
          unique: options?.uniqueIndexes?.includes(sch),
        });
      });
    }
  }
}
