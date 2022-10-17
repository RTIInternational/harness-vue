import getActions from "../store/actions";
import getState from "../store/state";
import getValidationFunctions from "../store/validation";
import getGetters from "../store/getters";
import getDataHelperFunctions from "../store/data";
import { getFilterActions, getFilterGetters } from "../store/filters";
import { getChartActions, getChartGetters } from "../store/charts";
// import getDataHelperFunctions from "../store/data";
import useHarnessStore from "../store/harnessStore";
import { mapActions, mapState } from "pinia";

export default function mixin(pinia) {
  return {
    beforeCreate() {
      // if route name is a valid harness page, use it as waypoint
      let waypoint = false;

      const harnessMetadata = useHarnessStore(pinia);

      if (
        this.$route &&
        this.$route.name &&
        harnessMetadata.getPages.includes(this.$route.name)
      ) {
        waypoint = this.$route.name;
      }
      // if router is not installed and only a single harness page exists, use it as waypoint
      if ((harnessMetadata.getPages.length === 1) & !this.$route) {
        waypoint = harnessMetadata.pages[0];
      }

      // if a waypoint override was specified, use that
      if (this.$attrs["harness-waypoint"]) {
        waypoint = this.$attrs["harness-waypoint"];
      }

      if (waypoint) {
        // get page store
        const pageFunc = harnessMetadata.getPageStores[waypoint];
        // const pageStore = pageFunc();
        const pageDefinition = harnessMetadata.getpageDefinitions[waypoint];
        //   const pageDefinition = { key: "foo" };
        const stateAndGetters = getAttributeNames({
          ...getState(pageDefinition),
          ...getGetters(pageDefinition),
          ...getFilterGetters(),
          ...getChartGetters(),
          ...getDataHelperFunctions(),
          ...getValidationFunctions(),
        });
        const actions = getAttributeNames({
          ...getActions(pageDefinition),
          ...getFilterActions(),
          ...getChartActions(),
        });
        this.$options.methods = {
          ...this.$options.methods,
          ...mapActions(pageFunc, actions),
        };
        this.$options.computed = {
          ...this.$options.computed,
          ...mapState(pageFunc, stateAndGetters),
          pageStore() {
            return pageFunc(pinia);
          },
        };
      }
    },
  };
}

function getAttributeNames(obj) {
  return Object.getOwnPropertyNames(obj).filter(
    (key) => !key.includes("_") && key !== "constructor"
  );
}
