export class Database {
  db: IDBDatabase | null = null;
  constructor(name: string, version?: number) {
    const request = window.indexedDB.open(name, version);
    request.onerror = function(e) {
      console.error('Cannot use indexedDB, See console log.');
      console.error(e);
    };
    request.onsuccess = () => {
      this.db = request.result;
    };
  }
}
