export abstract class Database {
  getDataBase(name: string, version?: number) {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = window.indexedDB.open(name, version);
      request.onerror = function(e) {
        console.error('Cannot use indexedDB, See console log.');
        console.error(e);
        reject(e);
      };
      request.onsuccess = () => {
        const db = request.result;
        resolve(db);
      };
    });
  }
}
