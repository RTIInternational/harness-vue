import { capitalize } from "./utils.js";
import useHarnessStore from "./harnessStore.js";
import getDefaultOption from "./defaultOption.js";
/**
 * @module pageStore
 */
export default function getActions(pageDefinition) {
  const actions = {};
  const filters = pageDefinition.filters();
  for (const filterKey in filters) {
    const filterAction = function (payload) {
      this[`${filterKey}Filter`] = payload;
    };
    const optionsAction = function (payload) {
      this[`${filterKey}Options`] = payload;
    };
    actions[`set${capitalize(filterKey)}Filter`] = filterAction;
    actions[`set${capitalize(filterKey)}Options`] = optionsAction;
  }

  const charts = pageDefinition.charts();
  for (const chartKey in charts) {
    const chartAction = function (payload) {
      this[`${chartKey}ChartData`] = payload;
    };
    actions[`set${capitalize(chartKey)}ChartData`] = chartAction;
  }

  if (pageDefinition.extendActions) {
    Object.assign(actions, pageDefinition.extendActions());
  }

  return {
    ...actions,
    /**
     * @param  {any} payload
     * sets the request cache to the given payload
     * @memberof module:pageStore
     */
    setRequestCache(payload) {
      this.requestCache = payload;
    },

    /**
     * Flips the data loading boolean
     * @memberof module:pageStore
     */
    toggleDataLoading() {
      this.dataLoading = !this.dataLoading;
    },

    /**
     * Runs the load data function for a given page
     *
     * @memberof module:pageStore
     * @async
     */
    async loadData() {
      if (!pageDefinition.loadData) {
        throw String(
          "loadData function is missing in page file. loadData must exist to use LOAD_DATA action",
        );
      }
      const harnessStore = useHarnessStore();
      const pageStore = harnessStore.getPageStores[pageDefinition.key]();
      const data = await pageDefinition
        .loadData(pageDefinition, pageStore)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          throw Error(error);
        });
      for (const chartKey in pageDefinition.charts()) {
        if (data[chartKey] === null) {
          throw String("Retrieved data is missing data for chart " + chartKey);
        }
        this.setChartData(chartKey, data[chartKey]);
      }
    },
    /**
     * Sets the data for all charts to null
     * @memberof module:pageStore
     */
    clearData() {
      for (const chartKey in this.pageDefinition.charts()) {
        this.setChartData(chartKey, null);
      }
    },

    /**
     * @param  {Array} payload=null
     * Initializes the defaults for all filters. If an array of filter keys is provided, only those filters will be initialized
     * @memberof module:pageStore
     */
    initializeDefaults(payload = null) {
      let filterKeys = Object.keys(this.getFilters);
      if (payload) {
        filterKeys = filterKeys.filter((fKey) => payload.includes(fKey));
      }
      filterKeys.forEach((filterKey) => {
        this.setFilter(
          filterKey,
          getDefaultOption(
            this.getFilterDefinition(filterKey),
            this.getOptionsForFilter(filterKey),
          ),
        );
      });
    },
  };
}
