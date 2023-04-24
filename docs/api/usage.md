# Usage

The API documentation documents all of the methods available on a Harness-Vue Pinia page store. For the purposes of documentation, all methods are available as part of a `pageStore` module. Depending on how you are accessing a Harness-Vue store (in a component with composition or options APIs, in a loadData function, elsewhere in plain javascript), this may be made available to you differently. See examples below, and refer to the [documentation on automagic page stores](/introduction/getting-started.html#automagic-page-stores) for more information on how to include Harness-Vue in your components.

## Components
### Composition API
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
harness.loadData() // functions available on the harness-vue instance
</script>
```
### Options API
```vue
<template>
  <div>
    {{ getChartData('chartKey') }}
  </div>
</template>
<script>
  export default {
    name: 'chart',
    mounted() {
        this.loadData() // functions available on the vue instance
    }
  }
</script>
```

## Outside of Components
### loadData function
```javascript
export default async function loadData(pageDefinition, pageStore) { 
    const filterValue = pageStore.getFilter('filterKey'); // functions available on the pageStore instance
}
```