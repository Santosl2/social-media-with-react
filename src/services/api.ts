import { setup } from "axios-cache-adapter";

import localforage from "localforage";
import memoryDriver from "localforage-memoryStorageDriver";

localforage.defineDriver(memoryDriver);
const localforageStore = localforage.createInstance({
  driver: [localforage.LOCALSTORAGE, localforage.INDEXEDDB],
  name: "@cachedrequest",
});

const api = setup({
  baseURL: "http://localhost:3000/api/",
  cache: {
    maxAge: 15 * 60 * 1000,
    store: localforageStore,
  },
});

export { api };
