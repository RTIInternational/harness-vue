import { capitalize } from "./utils.js";

export default function subscribeActions(store, pageDefinition) {
  store.$onAction(({ name, store, args, after }) => {
    //before action is called
    runSubscriptions(name, args, store, pageDefinition, "before");
    after(() => {
      runSubscriptions(name, args, store, pageDefinition, "after");
    });
  });
}

function runSubscriptions(name, args, store, pageDefinition, hook) {
  // for loadData actions, both toggle the dataLoading state variable
  // and also check for before/after loadData hooks
  if (name === "loadData") {
    store.toggleDataLoading();
    if (pageDefinition[`${hook}LoadData`]) {
      pageDefinition[`${hook}LoadData`]({ name, args }, store);
    }
  } else if (name.includes("Filter") && name !== "setFilter") {
    // iterate over filters to find if any match the action name
    // and run their before/after hooks
    Object.keys(store.getFilters).forEach((filterKey) => {
      const filterActionString = `set${capitalize(filterKey)}Filter`;
      if (
        name === filterActionString &&
        store.getFilters[filterKey][`${hook}Set`]
      ) {
        store.getFilters[filterKey][`${hook}Set`]({ name, args }, store);
      }
    });
  } else if (name.includes("ChartData") && name !== "setChartData") {
    // iterate over hcarts to find if any match the action name
    // and run their before/after hooks
    Object.keys(store.getCharts).forEach((chartKey) => {
      const chartActionString = `set${capitalize(chartKey)}ChartData`;
      if (
        name === chartActionString &&
        store.getCharts[chartKey][`${hook}Set`]
      ) {
        store.getCharts[chartKey][`${hook}Set`]({ name, args }, store);
      }
    });
  }
}
