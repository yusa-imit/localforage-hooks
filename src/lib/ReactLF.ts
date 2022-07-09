import localforage from 'localforage';

abstract class ReactLF {
  static DEFAULT_DB_NAME = 'ReactLF_Database';
  static DEFAULT_DRIVER_SETTINGS = [
    localforage.INDEXEDDB,
    localforage.LOCALSTORAGE,
    localforage.WEBSQL,
  ];
  public static async getDatabaseNames() {
    const arr: Array<string> = [];
    const dbs = await indexedDB.databases();
    dbs.forEach(v => {
      if (!v.name) {
        console.warn(
          "Database name is unreachable, set your database's name correctly.",
          v
        );
      }
      if (v.name) arr.push(v.name);
    });
    return arr;
  }
  public static async getDatabse(
    databaseName: string,
    options: { description?: string; driver? }
  ) {
    const dbs = await this.getDatabaseNames();
    if (!dbs.includes(databaseName)) {
      const db = localforage.createInstance({
        name: databaseName,
        driver: options.driver || this.DEFAULT_DRIVER_SETTINGS,
      });
    }
  }
}

export default ReactLF;
