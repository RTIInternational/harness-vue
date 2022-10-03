import { defineStore } from "pinia";
import getActions from "./actions";
import getState from "./state";
import getGetters from "./getters";
import getValidationFunctions from "./validation";
import { getFilterGetters, getFilterActions } from "./filters";
import { getChartGetters, getChartActions } from "./charts";
import getDataHelperFunctions from "./data";
import subscribeActions from "./subscriptions";

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
