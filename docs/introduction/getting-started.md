# Getting Started

## Application Dependencies
Harness-Vue requires your application to include [Vue.js](https://vuejs.org/) 3.x with [Pinia](https://pinia.vuejs.org/) installed.

## Installation
Install Harness-Vue with the package manager of your choice:
```sh
npm install @rtidatascience/harness-vue
# or with yarn
yarn add @rtidatascience/harness-vue
```

After following Pinia's [instructions](https://pinia.vuejs.org/getting-started.html) on installing the core Pinia instance to your Vue application, pass the Pinia instance to Harness-Vue and install the plugin:

```javascript
import { harnessPlugin } from "@rtidatascience/harness-vue"
// pages? more on this later!
import pages from "./harness-pages/manifest"

import App from "./App.vue"

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(harnessPlugin, { pinia, pages })
app.mount("#app");
```

## Routing
If using [Vue Router](https://router.vuejs.org/) for a single-page application, you can optionally pass the router instance to the Harness-Vue plugin to have Harness-Vue create a route for each Harness page definition in your application. This page will be located at the page's key and run the `loadData()` lifecycle hook in the `beforeEnter()` [navigation guard](https://router.vuejs.org/guide/advanced/navigation-guards.html#per-route-guard).

```javascript
import { harnessPlugin } from "@rtidatascience/harness-vue"
// pages? more on this later!
import pages from "./harness-pages/manifest"
import router from "./router";
import App from "./App.vue"

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(harnessPlugin, { pinia, pages, router })
// add the router to the application AFTER Harness-Vue
app.use(router);
app.mount("#app");
```

## Automagic Page Stores
One of the goals of Harness-Vue is the ability to write components that are widely reusable across pages, charts and filters - having an API of helper functions that provide contextualized actions on each page is a convenience feature that allows for more robust and reusable components. In order to assist in that process, Harness-Vue exports a global mixin for the options API and a composable for the composition API that detect what page your component is currently referring to using the following logic:

  * first by checking if the route name (if vue-router is used) matches the name of an installed page definition
  * second by checking if there is only one page and no vue-router installed and using that by default
  * third by checking for a provided `waypoint` rop that matches a page definition key


### Options API mixin

If the mixin detects a match, all of the available Harness-Vue API functions are mapped to the component using the [mapState](https://pinia.vuejs.org/core-concepts/state.html#usage-with-the-options-api) and [mapActions](https://pinia.vuejs.org/core-concepts/actions.html#without-setup) functions from Pinia. Using this mixin makes all Harness API functions available in the `this` context in your component.

To install the mixin, import it from the core library and install it as a mixin.

`main.js`
```javascript
import { harnessPlugin, harnessMixin } from "@rtidatascience/harness-vue"
// pages? more on this later!
import pages from "./harness-pages/manifest"
import App from "./App.vue"

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(harnessPlugin, { pinia, pages, router })
app.mixin(harnessMixin(pinia));
app.mount("#app");
```

Component Example:
```vue
<template>
  <div>
    {{ getChartData(chartKey) }}
  </div>
</template>
<script>
  export default {
    name: 'chart',
    props: {
      chartKey: {
        required: true,
        type: String
      }
    }
  }
</script>
```

### Composable
For the composition API, Harness-Vue publishes a composable that follows the logic defined above to determine the page and returns the appropriate pinia store for you to use. 

Component example:
```vue 
<template>
  <div>
    {{ harness.getChartData(chart.key) }}
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useHarnessComposable } from "@rtidatascience/harness-vue";
defineProps({
  chart: {
    type: Object,
    required: true,
  },
});
const harness = useHarnessComposable();
</script>

```