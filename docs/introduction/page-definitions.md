# Page definitions

The core unit of the Harness Vue plugin the page definition. The page definition is an expected format for developers to provide to the plugin to be translated into Harness Vue pinia stores.

A page definition is a Javascript class that includes the following attributes and methods. In development, the plugin will validate that your class conforms to the expected format and give verbose errors to correct any mistakes.

## Metadata
* `key` (`String`): The page key will be used to refer to/retrieve the page definition internally in the application, as well as generate a route if Vue Router is provided to the plugin.
* `title` (`String`): The title attribute is intended for developers to use in display - for example, as the text in a router link or the header of a page.
* `pageComponent` (Optional, Vue Component): If used with Vue Router, this attribute should include a Vue component to be rendered by Vue Router [via the `<router-view>` syntax](https://router.vuejs.org/guide/).
* `pageProps` (Optional, `Object`): An optional object to be passed to the page component as props.

```js
import pageComponent from "@/components/pages/examplePage"
export default class ExamplePage {
    title = "Example Page";
    key = "examplePage";
    pageComponent = examplePage;
    pageProps = {};
}
```

## Charts
The page definition should have a `charts` function that returns the chart definitions for the page. The output of this function should be an object in which each pair is a string representing a chart's key, and the value is the chart definition with the following format:

* `label` (`String`): A label string intended to be used for things such as chart titles and reference text.
* `component` (`String` or Component): The component meant to be rendered for this chart. This is intended for use with Vue's [dynamic component](https://vuejs.org/guide/essentials/component-basics.html#dynamic-components) functionality. This can either be a string referencing a component that is globally registered, or a component definition itself. If passing a component itself, make sure to read the note on including components [at the bottom of this page](#including-components-in-page-definitions).
* `props` (`Object`): props meant to be mapped to the component once rendered.
* `beforeSet` and `afterSet` functions: these functions will accept two arguments `(action, store)` and be run in the before/after hooks for the setter actions provided by Harness Vue using [Pinia's action subscriptions](https://pinia.vuejs.org/core-concepts/actions.html#subscribing-to-actions) The `action` argument will be an object with the name/args of the action and the `store` argument will be the pinia store representing this page.

```js
import { shallowRef } from "vue"
import barChart from "@/components/charts/barChart.vue"
export default class ExamplePage {
        // ... //
    charts = function () {
        return { 
            exampleChart1: {
                title: "Example Chart #1",
                component: shallowRef(barChart),
                // or, if barChart is globally registered,
                component: 'barChart',
                props: {
                    chartKey: "exampleChart1",
                    color: "red"
                },
                afterSet(action, store) {
                    // do something after this chart is set!
                }
            }
        }
    }
}
```

For each chart in the page definition, Harness Vue will create the following:

* state: the store will have an `exampleChart1ChartData` state attribute
* getter: the store will have a `getExampleChart1ChartData` getter
* setter: the store will have a `setExampleChart1ChartData` setter action
* subscriptions: pinia action subscriptions will be set up for the beforeSet and afterSet functions provided by each chart

## Filters
The page definition should have a `filters` function that returns the filter definitions for the page. The output of this function should be an object in which each pair is a string representing a filter's key, and the value is the filter definition with the following format:

* `label` (`String`): A label string intended to be used for things such as input labels.
* `component` (`String` or Component): The component meant to be rendered for this chart. This is intended for use with Vue's [dynamic component](https://vuejs.org/guide/essentials/component-basics.html#dynamic-components) functionality. This can either be a string referencing a component that is globally registered, or a component definition itself. If passing a component itself, make sure to read the note on including components [at the bottom of this page](#including-components-in-page-definitions).
* `props` (`Object`): props meant to be mapped to the component once rendered.
* `beforeSet` and `afterSet` functions: these functions will accept two arguments `(action, store)` and be run in the before/after hooks for the setter actions provided by Harness Vue using [Pinia's action subscriptions](https://pinia.vuejs.org/core-concepts/actions.html#subscribing-to-actions) The `action` argument will be an object with the name/args of the action and the `store` argument will be the pinia store representing this page.
* `options` (`Array`): an array of options, each of which should be an object with a key and label. These options will be used for inputs like selects, radio groups and checkbox groups.

```js
import { shallowRef } from "vue"
import selectComponent from "@/components/filters/selectComponent.vue"
export default class ExamplePage {
    // ... //
    filters = function () {
        return {
            exampleSelect: {
                label: "Example Select",
                component: shallowRef(selectComponent)
                // or if selectComponent is globally registered
                component: "selectComponent",
                options: [
                    {
                        key: "exampleOption",
                        label: "Example Option",
                        default: true,
                    },
                    {
                        key: "exampleOption2",
                        label: "Example Option 2",
                    },
                    {
                        key: "exampleOption3",
                        label: "Example Option 3",
                    },
                ],
                afterSet(action, store) {
                    // do something after set!
                }
            },
        }
    }
}
```

For each filter in the page definition, Harness Vue will create the following:
* state:
    * `exampleSelectFilter` state attribute for the current filter value
    * `exampleSelectOptions` state attribute for the current filter options
* getters
    * `getExampleSelectFilter` for the current filter value
    * `getExampleSelectOptions` for the current filter options
* setters
    * `setExampleSelectFilter` for setting the current filter value
    * `setExampleSelectOptions` for setting the current filter options
* subscriptions: pinia action subscriptions will be set up for the beforeSet and afterSet functions provided by each chart

### Multiple selects
By default, the value of each filter is expected to be a `String`. However, if a filter is given the prop `multiple` set to `true`, then the value of the filter will be expected to be an `Array`.

### Defaults
Harness Vue will attempt to find defaults for each filter at runtime, as well as whenever instructed to via the `intializeDefaults()` lifecycle hook. Harness Vue will look for options with the `default` attribute set to `true`. If none exist, it will use the first option as a default.

## Load Data
A page definition also includes an asynchronous function called `loadData`. This function is given two arguments, (`pageDefinition`, `pageStore`), and is expected to return an object with a key for each chart and a value representing the data each chart should update to include. For more on how this function is used, please see the [lifecycle tutorial](/usage/lifecycle).

```js
export default class ExamplePage {
    // ... //
    loadData = async (pageDefinition, pageStore) => {
        const apiUrl = "https://api.com/endpoint?filter=" + pageStore.getFilter("exampleFilter")
        const data = await fetch(apiUrl)
            .then((response) => response.json())
        return {
            exampleChart1: data
        }
    }
}
```


## Other
Similar to the `beforeSet` and `afterSet` functionality in the charts and filters, page definitions can include `beforeLoadData` and `afterLoadData` functions to be run before and after `loadData`, respectively.

## Full Example

```js
import pageComponent from "@/components/pages/examplePage"
import barChart from "@/components/charts/barChart.vue"
import selectComponent from "@/components/filters/selectComponent.vue"
export default class ExamplePage {
    title = "Example Page";
    key = "examplePage";
    pageComponent = examplePage;
    pageProps = {};

    loadData = async (pageDefinition, pageStore) => {
        const apiUrl = "https://api.com/endpoint?filter=" + pageStore.getFilter("exampleFilter")
        const data = await fetch(apiUrl)
            .then((response) => response.json())
        return {
            exampleChart1: data
        }
    }

    filters = function () {
        return {
            exampleSelect: {
                label: "Example Select",
                component: shallowRef(selectComponent)
                // or if selectComponent is globally registered
                component: "selectComponent",
                options: [
                    {
                        key: "exampleOption",
                        label: "Example Option",
                        default: true,
                    },
                    {
                        key: "exampleOption2",
                        label: "Example Option 2",
                    },
                    {
                        key: "exampleOption3",
                        label: "Example Option 3",
                    },
                ],
                afterSet(action, store) {
                    // do something after set!
                }
            },
        }
    }

    charts = function () {
        return { 
            exampleChart1: {
                title: "Example Chart #1",
                component: shallowRef(barChart),
                // or, if barChart is globally registered,
                component: 'barChart',
                props: {
                    chartKey: "exampleChart1",
                    color: "red"
                },
                afterSet(action, store) {
                    // do something after this chart is set!
                }
            }
        }
    }

    afterLoadData(action, store) {
      // do something after loadData runs!
    }
}
```

## The Manifest file
The Harness Vue plugin expects an array of page definitions when installed. While you can assemble this entirely in your `main.js` Vue entrypoint, it is common practice in Harness Vue applications to have a `manifest.js` file that gathers your page files and returns them in one place, like so:

```js
import examplePage from "./examplePage";
const pages = [examplePage]; // add pages to this array
export default pages;

```

This would then be imported and passed along to Harness Vue in your application startup:

```js
import { harnessPlugin } from "@rtidatascience/harness-vue"
import pages from "./harness-pages/manifest"

import App from "./App.vue"

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(harnessPlugin, { pinia, pages })
app.mount("#app");
```

## Including Components in Page Definitions
Because these page definitions are stored in Pinia, they are inherently reactive. This means stored components become reactive, which causes a number of problems with performance. When referencing a component in a page definition (ie for a Filter or Chart), you have two options:

* use the vue `shallowRef` [function](https://vuejs.org/api/reactivity-advanced.html#shallowref) before including it as shown in the many examples above
* [Globally register your components](https://vuejs.org/guide/components/registration.html) and refer to them as strings.