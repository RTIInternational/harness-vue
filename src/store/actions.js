import { capitalize } from "./utils";
import metadataStore from "./harnessStore";
import getDefaultOption from "./defaultOption";
export default function getActions(pageObject) {
  const actions = {
    setRequestCache(payload) {
      this.requestCache = payload;
    },
    toggleDataLoading() {
      this.dataLoading = !this.dataLoading;
    },
    async loadData() {
      if (!pageObject.retrieveData) {
        throw String(
          "retrieveData function is missing in page file. retrieveData must exist to use LOAD_DATA action"
        );
      }
      const harnessStore = metadataStore();
      const pageStore = harnessStore.getPageStores[pageObject.key]();
      const data = await pageObject
        .retrieveData(pageObject, pageStore)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          throw Error(error);
        });
      for (const chartKey in pageObject.charts()) {
        if (data[chartKey] === null) {
          throw String("Retrieved data is missing data for chart " + chartKey);
        }
        this.setChartData(chartKey, data[chartKey]);
      }
    },
    clearData() {
      for (const chartKey in pageObject.charts()) {
        this.setChartData(chartKey, null);
      }
    },
    initializeDefaults(payload = null) {
      let filterKeys = Object.keys(this.getFilters);
      if (payload) {
        filterKeys = filterKeys.filter((fKey) => payload.includes(fKey));
      }
      filterKeys.forEach((filterKey) => {
        this.setFilter(
          filterKey,
          getDefaultOption(filterKey, this.getOptionsForFilter(filterKey))
        );
      });
    },
  };
  const filters = pageObject.filters();
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

  const charts = pageObject.charts();
  for (const chartKey in charts) {
    const chartAction = function (payload) {
      this[`${chartKey}ChartData`] = payload;
    };
    actions[`set${capitalize(chartKey)}ChartData`] = chartAction;
  }
  return actions;
}
