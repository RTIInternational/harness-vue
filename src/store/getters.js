import { capitalize } from "./utils.js";

/**
 * @module pageStore
 */
export default function getGetters(pageDefinition) {
  // add initial getter for raw data
  const getters = {
    /**
     * Gets the contents of the request cache for a given page
     * @memberof module:pageStore
     */
    getRequestCache(state) {
      return state.requestCache;
    },
    getPage(state) {
      return state.page;
    },
    /**
     * Gets the page definition for a given page
     * @memberof module:pageStore
     */
    getPageDefinition(state) {
      return state.pageDefinition;
    },
    /**
     * Gets the filter definitions for a given page
     * @memberof module:pageStore
     */
    getFilters(state) {
      return state.filters;
    },
    /**
     * Gets the filter keys for a given page
     * @memberof module:pageStore
     */
    getFilterKeys(state) {
      return Object.keys(state.filters);
    },
    /**
     * Gets the chart definitions for a given page
     * @memberof module:pageStore
     */
    getCharts(state) {
      return state.charts;
    },
    /**
     * Gets the chart keys for a given page
     * @memberof module:pageStore
     */
    getChartKeys(state) {
      return Object.keys(state.charts);
    },
    /**
     * Gets the data loading boolean (toggled by loadData) for a given page
     * @memberof module:pageStore
     */
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

  if (pageDefinition.extendGetters) {
    Object.assign(getters, pageDefinition.extendGetters());
  }
  return getters;
}
