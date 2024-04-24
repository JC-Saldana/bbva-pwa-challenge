import { openDB } from 'idb';

const dbPromise = openDB('my-database', 1, {
    /**
     * This function is called when the database needs to be upgraded.
     * It creates an object store and indexes if they don't exist.
     * @param {IDBDatabase} db - The IndexedDB database instance.
     * @returns {void}
     */
    upgrade(db) {
        if (!db.objectStoreNames.contains('items')) {
            const store = db.createObjectStore('items', { keyPath: 'id', autoIncrement: true });
            store.createIndex('name', 'name');
        }
    },
});

/**
 * Represents an object containing CRUD operations for interacting with the database.
 * @type {Object}
 * @property {Function} getAllItems - Retrieves all items from the database.
 * @property {Function} addItem - Adds a new item to the database.
 */
export const database = {
    /**
     * Retrieves all items from the database.
     * @async
     * @returns {Promise<Array<Object>>} An array of items from the database.
     */
    async getAllItems() {
        const db = await dbPromise;
        return db.getAll('items');
    },

    async addItem(item) {
        const db = await dbPromise;
        const tx = db.transaction('items', 'readwrite');
        const store = tx.objectStore('items');
        store.add(item);
        return tx.complete;
    }
};
