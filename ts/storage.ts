const createNoopStorage = () => ({
  getItem: () => null,
  setItem: () => null,
  removeItem: () => null,
  clear: () => null,
});

class Storage {
  private static instance: Storage;
  private storage: typeof window.localStorage | ReturnType<typeof createNoopStorage>;

  private constructor() {
    this.storage = typeof window !== 'undefined' ? window.localStorage : createNoopStorage();
  }

  static getInstance() {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }
    return Storage.instance;
  }

  getItem(key: string) {
    return this.storage.getItem(key);
  }

  setItem(key: string, value: string) {
    this.storage.setItem(key, value);
  }

  removeItem(key: string) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }
}

export const storage = Storage.getInstance();
