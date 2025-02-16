import getDefaultOption from "./defaultOption.js";

export default function getState(pageDefinition) {
  // create initial state with raw data
  const state = {
    pageDefinition: pageDefinition,
    filters: pageDefinition.filters(),
    charts: pageDefinition.charts(),
    requestCache: null,
    dataLoading: false,
  };

  // add filter and lookup for each possible filter
  const filters = pageDefinition.filters();
  for (const filterKey in filters) {
    state[`${filterKey}Filter`] = getDefaultOption(
      filters[filterKey],
      filters[filterKey].options,
    );
    state[`${filterKey}Options`] = filters[filterKey].options || [];
    state[`${filterKey}TriggerLoadData`] = true;
  }

  // add chart data container for each chart type
  const charts = pageDefinition.charts();
  for (const chartkey in charts) {
    state[`${chartkey}ChartData`] = null;
  }
  if (pageDefinition.extendState) {
    Object.assign(state, pageDefinition.extendState());
  }

  return state;
}
