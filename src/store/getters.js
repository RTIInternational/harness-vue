import { capitalize } from "./utils";

export default function getGetters(pageDefinition) {
  // add initial getter for raw data
  const getters = {
    getRequestCache(state) {
      return state.requestCache;
    },
    getPage(state) {
      return state.page;
    },
    getFilters(state) {
      return state.filters;
    },
    getCharts(state) {
      return state.charts;
    },
    getDataLoading(state) {
      return state.dataLoading;
    },
  };
  // add getter for each filter
  // add getter for each filter's options
  const filters = pageDefinition.filters();
  for (const filterKey in filters) {
    const filterGetter = function (state) {
      return state[`${filterKey}Filter`];
    };
    const optionGetter = function (state) {
      return state[`${filterKey}Options`];
    };
    getters[`get${capitalize(filterKey)}Filter`] = filterGetter;
    getters[`get${capitalize(filterKey)}Options`] = optionGetter;
  }

  // add getter for each chart data container
  const charts = pageDefinition.charts();
  for (const chartKey in charts) {
    const getter = function (state) {
      return state[`${chartKey}ChartData`];
    };
    getters[`get${capitalize(chartKey)}ChartData`] = getter;
  }
  return getters;
}
