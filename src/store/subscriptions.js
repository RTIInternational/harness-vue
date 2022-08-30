import { capitalize } from "./utils";

export default function subscribeActions(store, pageObject) {
  store.$onAction(({ name, store, args, after, onError }) => {
    //before action is called
    runSubscriptions(name, args, store, pageObject, "before");
    after((result) => {
      runSubscriptions(name, args, store, pageObject, "after");
    });
  });
}

function runSubscriptions(name, args, store, pageObject, hook) {
  // for loadData actions, both toggle the dataLoading state variable
  // and also check for before/after loadData hooks
  if (name === "loadData") {
    store.toggleDataLoading();
    if (pageObject[`${hook}LoadData`]) {
      pageObject[`${hook}LoadData`]({ name, args }, store);
    }
  } else if (name.includes("Filter") && name !== "setFilter") {
    // iterate over filters to find if any match the action name
    // and run their before/after hooks
    Object.keys(store.getFilters).forEach((filterKey) => {
      const filterActionString = `set${capitalize(filterKey)}Filter`;
      console.log(filterActionString);
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
