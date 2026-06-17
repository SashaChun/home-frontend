import { beforeEach } from 'vitest';

// Node 25 ships a partial global Web Storage that shadows jsdom's localStorage
// and lacks a usable clear(). Install a clean in-memory implementation so the
// auth-token logic in api/client.js is exercised against a predictable store.
class MemoryStorage {
  #store = new Map();
  get length() {
    return this.#store.size;
  }
  getItem(key) {
    return this.#store.has(key) ? this.#store.get(key) : null;
  }
  setItem(key, value) {
    this.#store.set(key, String(value));
  }
  removeItem(key) {
    this.#store.delete(key);
  }
  clear() {
    this.#store.clear();
  }
  key(i) {
    return Array.from(this.#store.keys())[i] ?? null;
  }
}

const storage = new MemoryStorage();
Object.defineProperty(globalThis, 'localStorage', {
  configurable: true,
  value: storage,
});
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'localStorage', {
    configurable: true,
    value: storage,
  });
}

beforeEach(() => {
  storage.clear();
});
