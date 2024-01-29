# Installation

## Application Dependencies
Harness-Vue requires your application to include [Vue.js](https://vuejs.org/) 3.x with [Pinia](https://pinia.vuejs.org/) installed.

## Developer Prerequisites
::: warning LEARN THESE FIRST
Harness-Vue is a plugin for Vue that builds stores in Pinia. Harness-Vue is intended for developers with a functional knowledge of/experience in:

* Javascript
* Vue
* Pinia
:::

It is highly recommended that developers familiarize themselves with these tools and build projects in Vue without Harness-Vue before building their first Harness-Vue application.

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

### Routing
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

## Starter Template
Additionally, we maintain [Harness-Vue-Starter-Template](https://github.com/RTIInternational/harness-vue-starter-template), a basic application created with [create-vue](https://github.com/vuejs/create-vue) with Harness-Vue and Harness-Vue-Bootstrap pre-installed as well as an example page definition with components.