import { defineStore } from "pinia";

export default defineStore("harnessVue", {
  state: () => ({
    pages: [],
    pageDefinitions: {},
    pageStores: {},
    optionsProvided: {},
  }),
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
    getOptionsProvided() {
      return this.optionsProvided;
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
