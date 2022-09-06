import { defineStore } from "pinia";
import getActions from "./actions";
import getState from "./state";
import getGetters from "./getters";
import getValidationFunctions from "./validation";
import getFilterHelperFunctions from "./filters";
import getChartHelperFunctions from "./charts";
import getDataHelperFunctions from "./data";
import subscribeActions from "./subscriptions";

export default function createHarnessStore(pageDefinition, options) {
  // options syntax
  const storeFunc = defineStore(pageDefinition.key, {
    state: () => getState(pageDefinition),
    getters: getGetters(pageDefinition),
    actions: {
      ...getActions(pageDefinition),
      ...getValidationFunctions(),
      ...getFilterHelperFunctions(),
      ...getChartHelperFunctions(),
      ...getDataHelperFunctions(),
    },
  });
  const store = storeFunc(options.pinia);
  subscribeActions(store, pageDefinition);
  return storeFunc;
}
