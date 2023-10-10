import { defineStore } from "pinia";
import getActions from "./actions.js";
import getState from "./state.js";
import getGetters from "./getters.js";
import getValidationFunctions from "./validation.js";
import { getFilterGetters, getFilterActions } from "./filters.js";
import { getChartGetters, getChartActions } from "./charts.js";
import getDataHelperFunctions from "./data.js";
import subscribeActions from "./subscriptions.js";

export default function createHarnessStore(pageDefinition, options) {
  // options syntax
  const storeFunc = defineStore(pageDefinition.key, {
    state: () => getState(pageDefinition),
    getters: {
      ...getGetters(pageDefinition),
      ...getFilterGetters(),
      ...getChartGetters(),
      ...getDataHelperFunctions(),
      ...getValidationFunctions(),
    },
    actions: {
      ...getActions(pageDefinition),
      ...getFilterActions(),
      ...getChartActions(),
    },
  });
  const store = storeFunc(options.pinia);
  subscribeActions(store, pageDefinition);
  return storeFunc;
}
