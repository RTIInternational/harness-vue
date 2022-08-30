import pages from "./validation/pages";
import harnessStore from "./store/harnessStore";
import createHarnessStore from "./store/createHarnessStore";
import createHarnessRoute from "./router/route.js";
import harnessMixin from "./mixin/mixin.js";
const harnessPlugin = {
  install: (app, options) => {
    // create harness metadata store in pinia
    const harness = harnessStore();

    // validate page files
    const validatedPages = pages(options.pages);

    // create harness store for each page file
    // register it in Pinia
    // add the function to the metadata store
    for (const Page of validatedPages) {
      const pageObject = new Page();
      const pageFunc = createHarnessStore(pageObject, options);
      const pageStore = pageFunc();
      harness.addStore(pageObject.key, pageObject, pageFunc);
      if (options.router) {
        const pageRoute = createHarnessRoute(pageStore, pageObject);
        options.router.addRoute(pageRoute);
      }
    }

    // add helper functions mixin
    // TODO: add helper function mixin
  },
};

export { harnessPlugin, harnessMixin, harnessStore };
