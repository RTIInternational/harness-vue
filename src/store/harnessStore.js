import { defineStore } from "pinia";

export default defineStore("harness", {
  state: () => ({ pages: [], pageDefinitions: {}, pageStores: {} }),
  getters: {
    getPages() {
      return this.pages;
    },
    getpageDefinitions() {
      return this.pageDefinitions;
    },
    getPageStores() {
      return this.pageStores;
    },
  },
  actions: {
    addStore(key, definition, store) {
      this.pages.push(key);
      this.pageDefinitions[key] = definition;
      this.pageStores[key] = store;
    },
  },
});
