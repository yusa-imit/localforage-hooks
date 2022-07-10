import { Scheme } from '../../type/Scheme';

export abstract class Table {
  /**
   * Constructor
   * @param db
   * @param tableName
   * @param scheme
   * @param options
   */
  getTable(
    db: IDBDatabase,
    tableName: string,
    scheme?: Scheme,
    options?: {
      keyPath?: string | string[] | null;
      autoIncrement?: boolean;
      uniqueIndexes?: Array<string>;
    }
  ) {
    return new Promise<IDBObjectStore>((resolve, reject) => {
      if (db.objectStoreNames.contains(tableName)) {
        const transaction = db.transaction(tableName);
        transaction.onerror = error => {
          reject(error);
        };
        transaction.oncomplete = () => {
          resolve(transaction.objectStore(tableName));
        };
      }
      try {
        const table = db.createObjectStore(tableName, {
          autoIncrement: scheme ? false : options?.autoIncrement,
          keyPath: options?.keyPath,
        });
        if (scheme) {
          scheme.forEach(sch => {
            if (sch === options?.keyPath || options?.keyPath?.includes(sch))
              return;
            table.createIndex(sch, sch, {
              unique: options?.uniqueIndexes?.includes(sch),
            });
          });
        }
        resolve(table);
      } catch (error) {
        reject(error);
      }
    });
  }
}
