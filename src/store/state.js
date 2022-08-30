import getDefaultOption from "./defaultOption";

export default function getState(pageObject) {
  // create initial state with raw data
  const state = {
    page: pageObject,
    filters: pageObject.filters(),
    charts: pageObject.charts(),
    requestCache: null,
    dataLoading: false,
  };

  // add filter and lookup for each possible filter
  const filters = pageObject.filters();
  for (const filterKey in filters) {
    state[`${filterKey}Filter`] = getDefaultOption(
      filters[filterKey],
      filters[filterKey].options
    );
    state[`${filterKey}Options`] = filters[filterKey].options || [];
  }

  // add chart data container for each chart type
  const charts = pageObject.charts();
  for (const chartkey in charts) {
    state[`${chartkey}ChartData`] = null;
  }
  return state;
}
