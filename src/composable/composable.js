// https://stackoverflow.com/questions/72209080/vue-3-is-getcurrentinstance-deprecated
import { getCurrentInstance } from "vue";
import { useHarnessStore } from "../harness.js";

export default function useHarnessComposable() {
  const harnessMetadata = useHarnessStore();
  const vueInstance = getCurrentInstance();

  let waypoint = false;

  // check for a vue-router route
  if (
    vueInstance.appContext.config.globalProperties.$route?.name &&
    harnessMetadata.getPages.includes(
      vueInstance.appContext.config.globalProperties.$route.name,
    )
  ) {
    waypoint = vueInstance.appContext.config.globalProperties.$route.name;
  }

  // if router is not installed and only a single harness page exists, use it as waypoint
  if (
    (harnessMetadata.getPages.length === 1) &
    !vueInstance.appContext.config.globalProperties.$route
  ) {
    waypoint = harnessMetadata.pages[0];
  }

  // // if a waypoint override was specified, use that
  if (vueInstance.attrs["harness-waypoint"]) {
    waypoint = vueInstance.attrs["harness-waypoint"];
  }

  if (waypoint) {
    return harnessMetadata.getPageStores[waypoint]();
  }
  return waypoint;
}
