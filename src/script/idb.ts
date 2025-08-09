// idbHelpers.ts
import { openDB } from 'idb';

const DB_NAME = 'inracode';
const STORE_NAME = 'workspaceStore';

export async function getDB() {
    return await openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' }); // Use "id" as the primary key
            }
        },
    });
}

/**
 * Save the serialized Blockly workspace to IndexedDB.
 * @param id Unique workspace identifier or key.
 * @param serializedWorkspace The serialized workspace JSON.
 */
export async function saveWorkspace(id: string, serializedWorkspace: any): Promise<void> {
    const db = await getDB();
    await db.put(STORE_NAME, { id, data: serializedWorkspace });
    console.log(`Saved workspace`);
}

/**
 * Load the serialized Blockly workspace from IndexedDB.
 * @param id Unique workspace identifier or key.
 * @returns Stored serialized workspace JSON or `undefined` if not found.
 */
export async function loadWorkspace(id: string): Promise<any> {
    const db = await getDB();
    const result = await db.get(STORE_NAME, id);
    if (result) {
        console.log("Loaded saved workspace.");
        return result.data;
    }

    return {};
}