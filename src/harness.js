import pages from "./validation/pages";
import useHarnessStore from "./store/harnessStore";
import createHarnessStore from "./store/createHarnessStore";
import createHarnessRoute from "./router/route.js";
import harnessMixin from "./mixin/mixin.js";
import harnessComposable from "./composable/composable";
const harnessPlugin = {
  install: (app, options) => {
    // create harness metadata store in pinia
    const harness = useHarnessStore(options.pinia);

    // validate page files
    const validatedPages = pages(options.pages);

    // create harness store for each page file
    // register it in Pinia
    // add the function to the metadata store
    for (const Page of validatedPages) {
      const pageDefinition = new Page();
      const pageFunc = createHarnessStore(pageDefinition, options);
      const pageStore = pageFunc();
      harness.addStore(pageDefinition.key, pageDefinition, pageFunc);
      if (options.router) {
        const pageRoute = createHarnessRoute(pageStore, pageDefinition);
        options.router.addRoute(pageRoute);
      }
    }

    // add helper functions mixin
    // TODO: add helper function mixin
  },
};

export { harnessPlugin, harnessMixin, useHarnessStore, harnessComposable };
