# Use in Components

## Automagic Page Detection
One of the goals of Harness-Vue is the ability to write components that are widely reusable across pages, charts and filters - having an API of helper functions that provide contextualized actions on each page is a convenience feature that allows for more robust and reusable components. In order to assist in that process, Harness-Vue exports a global mixin for the options API and a composable for the composition API that detect what page your component is currently referring to using the following logic:

  * first by checking if the route name (if vue-router is used) matches the name of an installed page definition
  * second by checking if there is only one page and no vue-router installed and using that by default
  * third by checking for a provided `waypoint` rop that matches a page definition key


## Composition API
For the composition API, Harness-Vue publishes a composable that follows the logic defined above to determine the page and returns the appropriate pinia store for you to use. To use Harness-Vue in a component, import and instantiate the composable.

Component example:
```vue 
<script setup>
import { useHarnessComposable } from "@rtidatascience/harness-vue";
const harness = useHarnessComposable();
</script>
<template>
  <div>
    {{ harness.getChartData('chartkey') }}
  </div>
</template>
```


## Options API
For the Options API, Harness-Vue publishes a mixin usable in components or globally. If the mixin detects a match, all of the available Harness-Vue API functions are mapped to the component using the [mapState](https://pinia.vuejs.org/core-concepts/state.html#usage-with-the-options-api) and [mapActions](https://pinia.vuejs.org/core-concepts/actions.html#without-setup) functions from Pinia. Using this mixin makes all Harness API functions available in the `this` context in your component.

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
    {{ getChartData('chartkey') }}
  </div>
</template>
<script>
  export default {
    name: 'chart',
  }
</script>
```