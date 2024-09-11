import { capitalize } from "./utils.js";

export default function subscribeActions(store, pageDefinition) {
  store.$onAction(async ({ name, store, args, after }) => {
    // issues with this approach:
    // using await here causes the after() callback not to run
    // also, the action itself does not wait for runSubscriptions to finish ie beforeSet is not completing before setting the filter
    await runSubscriptions(name, args, store, pageDefinition, "before");
    after(async () => {
      await runSubscriptions(name, args, store, pageDefinition, "after");
    });
  });
}

async function runSubscriptions(name, args, store, pageDefinition, hook) {
  // for loadData actions, both toggle the dataLoading state variable
  // and also check for before/after loadData hooks
  if (name === "loadData") {
    store.toggleDataLoading();
    if (pageDefinition[`${hook}LoadData`]) {
      await pageDefinition[`${hook}LoadData`]({ name, args }, store);
    }
  } else if (name.includes("Filter") && name !== "setFilter") {
    // iterate over filters to find if any match the action name
    // and run their before/after hooks
    const filterKeys = Object.keys(store.getFilters);
    // use for of because forEach does not work with async
    for (const filterKey of filterKeys) {
      const filterActionString = `set${capitalize(filterKey)}Filter`;
      if (
        name === filterActionString &&
        store.getFilters[filterKey][`${hook}Set`]
      ) {
        await store.getFilters[filterKey][`${hook}Set`]({ name, args }, store);
        if (hook === "after" && !store.getFilters[filterKey].synchronous) {
          await store.loadData();
        }
      }
    }
  } else if (name.includes("ChartData") && name !== "setChartData") {
    // iterate over hcarts to find if any match the action name
    // and run their before/after hooks
    const chartKeys = Object.keys(store.getCharts);
    for (const chartKey of chartKeys) {
      const chartActionString = `set${capitalize(chartKey)}ChartData`;
      if (
        name === chartActionString &&
        store.getCharts[chartKey][`${hook}Set`]
      ) {
        await store.getCharts[chartKey][`${hook}Set`]({ name, args }, store);
      }
    }
  }

  if (pageDefinition.extendSubscriptions) {
    pageDefinition.extendSubscriptions(name, args, store, pageDefinition, hook);
  }
}
