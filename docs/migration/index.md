# Migration Guide

1. Start from the harness-vue-starter-template
2. Check the `package.json` file in your old repository for any dependencies you may need to install such as `d3-fetch` or `highcharts` and install them in the new repository
3. Copy the following from the old repository to the new repository, overwriting:
    * `src/components` or the directory containing your components
    * `src/harness-pages` or wherever your harness pages/manifest file are located
    * `src/styles` or wherever your styles are located
    * `src/router` or wherever your router's index lives (if using vue router)
    * `src/App.vue` or your vue entrypoint components
4. Migrate changes from the `main.js` file in your old repository to the `main.js` repository in the new repository. Make sure that you keep the Vue setup in the new repository and change the syntax of any plugin installations as needed. In Vue 3, the Vue instance is `app` not `vue`, for example.
5. If you are using vuex outside of the harness context, migrate your existing vuex store to a pinia store
6. Globally find and replace `getRequestCache()` with `getRequestCache`
7. In harness page files, do the following:
    * Ensure that component imports are either wrapped in `shallowRef` or are using string syntax
    * for `loadData` functions, ensure that they only take two arguments. Those arguments used to be `state`, `pageObject` and `hs`. We now only pass two arguments, typically labeled `pageDefinition` and `store`. The new `pageDefinition` argument is equivalent to the old `pageObject` argument, and the new `store` argument includes the pinia store, which is roughly equivalent to both the `hs` argument and `state` argument. For simplicity's sake, the easiest way to facilitate this change is to delete the `state` argument, and look for any use of `state` and move it to use the `hs` argument which will be the pinia state.
    * change `retrieveData` to `loadData`
8. If using `harness-ui`:
    * Perform a global case-sensitive find/replace for `HarnessUi` and replace it with `HarnessVueBootstrap`
    * Perform a global case-sensitive find/replace for `harness-ui` and replace it with `harness-vue-bootstrap`
    * Remove all harness-ui imports in page definitions
9. Change style imports
10. Change component imports
11. Look for store subscribeActions
12. Copy over /public