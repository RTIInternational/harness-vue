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

```js
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

```js
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

## Options API mixin
The Harness-Vue package in its first release is intended for use with the Vue Options API. Harness-Vue includes a global mixin that does the following:

* attempts to locate what page to contextualize the component to
  * first by checking if the route name (if router provided) matches the name of an installed page definition
  * second by checking if there is only one page installed and using that by default
  * third by checking for a `harness-waypoint` prop that matches a page

If the mixin detects a match, all of the available Harness-Vue API functions are mapped to the component using the [mapState](https://pinia.vuejs.org/core-concepts/state.html#usage-with-the-options-api) and [mapActions](https://pinia.vuejs.org/core-concepts/actions.html#without-setup) functions from Pinia. This enables developers to write components that are page-agnostic as described in the "Why Harness-Vue" section of the about page.

To install the mixin, import it from the core library and install it as a mixin.

```js
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