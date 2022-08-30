import { defineStore } from "pinia";
import getActions from "./actions";
import getState from "./state";
import getGetters from "./getters";
import getValidationFunctions from "./validation";
import getFilterHelperFunctions from "./filters";
import getChartHelperFunctions from "./charts";
import getDataHelperFunctions from "./data";
import subscribeActions from "./subscriptions";

export default function createHarnessStore(pageObject) {
  // options syntax
  const storeFunc = defineStore(pageObject.key, {
    state: () => getState(pageObject),
    getters: getGetters(pageObject),
    actions: {
      ...getActions(pageObject),
      ...getValidationFunctions(),
      ...getFilterHelperFunctions(),
      ...getChartHelperFunctions(),
      ...getDataHelperFunctions(),
    },
  });
  const store = storeFunc();
  subscribeActions(store, pageObject);
  return storeFunc;
}
