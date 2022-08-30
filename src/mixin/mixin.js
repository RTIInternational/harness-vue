import getActions from "../store/actions";
import getState from "../store/state";
import getGetters from "../store/getters";
import getValidationFunctions from "../store/validation";
import getFilterHelperFunctions from "../store/filters";
import getChartHelperFunctions from "../store/charts";
import getDataHelperFunctions from "../store/data";
import harnessStore from "../store/harnessStore";
import { mapActions, mapGetters, mapState } from "pinia";

export default function mixin() {
  return {
    beforeCreate() {
      // if route name is a valid harness page, use it as waypoint
      let waypoint = false;
      // shim in this.$store for vuex mapGetters functions
      // vuex mapGetters depends on this.$store: https://github.com/vuejs/vuex/blob/dev/src/helpers.js#L81
      const harnessMetadata = harnessStore();

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
        const pageObject = harnessMetadata.getPageObjects[waypoint];
        //   const pageObject = { key: "foo" };
        const state = getAttributeNames(getState(pageObject));
        const getters = getAttributeNames(getGetters(pageObject));
        const actions = getAttributeNames({
          ...getActions(pageObject),
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
          ...mapGetters(pageFunc, getters),
          ...mapState(pageFunc, state),
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
