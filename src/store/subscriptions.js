import { capitalize } from "./utils.js";

export default function subscribeActions(store, pageDefinition) {
  store.$onAction(async ({ name, store, args, after }) => {
    //before action is called
    after(async () => {
      await runSubscriptions(name, args, store, pageDefinition, "after");
      await checkForLoadData(name, store);
    });

    await runSubscriptions(name, args, store, pageDefinition, "before");
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
    await Promise.all(
      Object.keys(store.getFilters).map(async (filterKey) => {
        const filterActionString = `set${capitalize(filterKey)}Filter`;
        if (
          name === filterActionString &&
          store.getFilters[filterKey][`${hook}Set`]
        ) {
          await store.getFilters[filterKey][`${hook}Set`](
            { name, args },
            store,
          );
        }
      }),
    );
  } else if (name.includes("ChartData") && name !== "setChartData") {
    // iterate over charts to find if any match the action name
    // and run their before/after hooks
    await Promise.all(
      Object.keys(store.getCharts).map(async (chartKey) => {
        const chartActionString = `set${capitalize(chartKey)}ChartData`;
        if (
          name === chartActionString &&
          store.getCharts[chartKey][`${hook}Set`]
        ) {
          await store.getCharts[chartKey][`${hook}Set`]({ name, args }, store);
        }
      }),
    );
  }

  if (pageDefinition.extendSubscriptions) {
    pageDefinition.extendSubscriptions(name, args, store, pageDefinition, hook);
  }
  return Promise.resolve();
}

// checks to see if the action is a filter action and if so, checks if the filter is synchronous
// if not, it will trigger a loadData action
async function checkForLoadData(name, store) {
  if (name.includes("Filter") && name !== "setFilter") {
    // get filter name from action
    const filterName = name.slice(3, -6);
    // find the matching filter key and retrieve definition
    const filterKey = store.getFilterKeys.find(
      (filter) => capitalize(filter) === filterName,
    );
    const filterObj = store.getFilterDefinition(filterKey);

    if (
      store[`${filterKey}TriggerLoadData`] &&
      !(
        Object.hasOwn(filterObj, "triggerLoadData") &&
        filterObj.triggerLoadData == false
      )
    ) {
      await store.loadData();
    }
  }
}
