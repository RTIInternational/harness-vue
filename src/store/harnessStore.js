import { defineStore } from "pinia";

export default defineStore("harnessStore", {
  state: () => ({ pages: [], pageObjects: {}, pageStores: {} }),
  getters: {
    getPages() {
      return this.pages;
    },
    getPageObjects() {
      return this.pageObjects;
    },
    getPageStores() {
      return this.pageStores;
    },
  },
  actions: {
    addStore(key, object, store) {
      this.pages.push(key);
      this.pageObjects[key] = object;
      this.pageStores[key] = store;
    },
  },
});
