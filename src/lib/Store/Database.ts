import { DBScheme } from '../../type/DBScheme';
import Connection from './Connection';
import JsStore from 'jsstore';

export default abstract class Store {
  private static connections: Record<string, JsStore.Connection> = {};
  static async init(scheme: DBScheme) {
    if (this.connections[scheme.name]) {
      return;
    }
    this.connections[scheme.name] = Connection.get();
    await this.connections[scheme.name].initDb(scheme);
  }
  static async changeDB(scheme: DBScheme) {
    if (!this.connections[scheme.name]) {
      await this.init(scheme);
    }
  }
  private static CHECK_DB(name: string) {
    if (!this.connections[name]) {
      this.ERROR.NO_DB_ERROR();
    }
  }
  static async insert(
    dbName: string,
    tableName: string,
    values: Array<Record<string, JsStore.DATA_TYPE>>,
    options?: {
      upsert?: boolean;
      validation?: boolean;
      ignore?: boolean;
    }
  ) {
    this.CHECK_DB(dbName);
    return await this.connections[dbName].insert({
      into: tableName,
      values: values,
      upsert: options?.upsert,
      validation: options?.validation,
      ignore: options?.ignore,
    });
  }
  static async select(
    dbName: string,
    tableName: string,
    options?: {
      limit?: number;
      skip?: number;
      order?:
        {
            by: string;
            type: 'asc' | 'desc';
            idbSorting?: boolean;
          }
        | {
            by: string;
            type: 'asc' | 'desc';
            idbSorting?: boolean;
          }[];
    }
  ) {
    this.CHECK_DB(dbName);
    return await this.connections[dbName].select({
      from: tableName,
      limit: options?.limit,
      skip: options?.skip,
      order: options?.order,
    });
  }
  private static ERROR = {
    NO_DB_ERROR: () => {
      console.error('DB is not connected yet. use init() first.');
      throw new Error('NO_CONNECTED_DB_ERROR');
    },
  };
}

namespace Database {
  export namespace Select {
    export interface Order {
      by: string;
      type: 'asc' | 'desc';
      idbSorting?: boolean;
    }
    export type OrderByMultiple = Array<{
      by: string;
      type?: 'asc' | 'desc';
      idbSorting?: boolean;
    }>;
  }
}
