import getActions from "../store/actions";
import getState from "../store/state";
import getValidationFunctions from "../store/validation";
import getFilterHelperFunctions from "../store/filters";
import getChartHelperFunctions from "../store/charts";
import getDataHelperFunctions from "../store/data";
import harnessStore from "../store/harnessStore";
import { mapActions, mapState, pinia } from "pinia";

export default function mixin(pinia) {
  return {
    beforeCreate() {
      // if route name is a valid harness page, use it as waypoint
      let waypoint = false;

      const harnessMetadata = harnessStore(pinia);

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
        const state = getAttributeNames(getState(pageDefinition));
        const actions = getAttributeNames({
          ...getActions(pageDefinition),
          ...getValidationFunctions(),
          ...getFilterHelperFunctions(),
          ...getChartHelperFunctions(),
          ...getDataHelperFunctions(),
        });
        this.$options.methods = {
          ...this.$options.methods,
          ...mapActions(pageFunc, actions),
        };
        this.$options.computed = {
          ...this.$options.computed,
          ...mapState(pageFunc, state),
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
