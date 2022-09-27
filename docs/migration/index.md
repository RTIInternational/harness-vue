# Migration

Harness-Vue is the successor to Harness, the original vuex-based state management system for Vue 2. This migration guide assumes that your prior project was built from `harness-starter-template` and includes `harness-ui` and are migrating to `harness-vue-starter-template` and `harness-vue-bootstrap`. If not, ignore those sections and instead start from [create-vue](https://github.com/vuejs/create-vue).

## Guide
1. Clone [harness-vue-starter-template](https://github.com/RTIInternational/harness-vue-starter-template) or create a new project using [create-vue](https://github.com/vuejs/create-vue)
2. Check the `package.json` file in your old repository for any dependencies you may need to install such as `d3-fetch` or `highcharts` and install them in the new repository
3. If those dependencies themselves require upgrades moving from Vue 2 to Vue 3, follow the instructions within those dependencies.
4. Copy the following from the old repository to the new repository, overwriting:
    * `src/components` or the directory containing your components
    * `src/harness-pages` or wherever your harness pages/manifest file are located
    * `src/styles` or wherever your styles are located
    * `src/router` or wherever your router's index lives (if using vue router)
    * `src/App.vue` or your vue entrypoint components
5. Migrate changes from the `main.js` file in your old repository to the `main.js` repository in the new repository. Make sure that you keep the Vue setup in the new repository and change the syntax of any plugin installations as needed. In Vue 3, the Vue instance is `app` not `vue`, for example.
6. If you are using vuex outside of the harness context, migrate your existing vuex store to a pinia store following [Pinia's documentation on migration](https://pinia.vuejs.org/cookbook/migration-vuex.html)
7. Globally find and replace `getRequestCache()` with `getRequestCache`
8. In harness page files, do the following:
    * Ensure that component imports are either wrapped in `shallowRef` or are using string syntax (see [page definition documentation](/introduction/page-definitions.html#including-components-in-page-definitions))
    * globally find and replace `retrieveData` functions with `loadData`
    * for `loadData` functions, ensure that they only take two arguments. Those arguments used to be `state`, `pageObject` and `hs`. We now only pass two arguments, typically labeled `pageDefinition` and `store`. The new `pageDefinition` argument is equivalent to the old `pageObject` argument, and the new `store` argument includes the pinia store, which is roughly equivalent to both the `hs` argument and `state` argument. For simplicity's sake, the easiest way to facilitate this change is to delete the `state` argument, and look for any use of `state` and move it to use the `hs` argument which will be the pinia state.
9. If using `harness-ui`:
    * Perform a global case-sensitive find/replace for `HarnessUi` and replace it with `HarnessVueBootstrap`
    * Perform a global case-sensitive find/replace for `harness-ui` and replace it with `harness-vue-bootstrap`
    * If using the Harness-Vue Bootstrap mixin, replace all component imports with string imports
    * Remove old style imports referring to harness-ui and instead install styles according to the harness-vue-bootstrap documentation
10. In Vue 3, all SFC imports require the file extension. Wherever SFC are imported, append `.vue` to the import. For example, change `import dashboard from '@/components/dashboard'` to `import dashboard from '@/components/dashboard.vue'`
11. If your project uses vuex `subscribeAction` to respond to harness changes, revise that to use [pinia's action subscription](https://pinia.vuejs.org/core-concepts/actions.html#subscribing-to-actions) mechanisms
12. Copy over non-code items from the previous repo - development data/assets in the `/public` directory, scripts, CI/CD etc