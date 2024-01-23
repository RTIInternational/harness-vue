// https://stackoverflow.com/questions/72209080/vue-3-is-getcurrentinstance-deprecated
import { useHarnessStore } from "../harness.js";

/**
 * Returns the current harness page store
 * If a waypoint is provided, that store is returned
 * If the route is provided and the route name matches a harness store key, that store is returned
 * If there is no router and only a single harness page exists, that store is returned
 * @param {any} waypoint=false a string matching a harness page store key
 * @returns {Object} a pinia store representing a harness page
 */
export default function useHarnessComposable(waypoint = false) {
  const harnessMetadata = useHarnessStore();
  if (waypoint === false) {
    let currentRoute =
      harnessMetadata.optionsProvided?.router?.currentRoute?.name;

    // check for a vue-router route
    if (currentRoute && harnessMetadata.getPages.includes(currentRoute)) {
      waypoint = currentRoute;
    }

    // if router is not installed and only a single harness page exists, use it as waypoint
    if (harnessMetadata.getPages.length === 1 && !currentRoute) {
      waypoint = harnessMetadata.pages[0];
    }
  }

  if (
    waypoint &&
    Object.keys(harnessMetadata.getPageStores).includes(waypoint)
  ) {
    return harnessMetadata.getPageStores[waypoint]();
  }
  console.error(
    `The detected waypoint ${waypoint} is not a valid harness page.`,
  );
}
