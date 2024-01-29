# Writing Filter Components
Writing filter components in Harness-Vue is easy thanks to Vue and Pinia. Filters in Harness-Vue as abstractions around a pinia store - but at their core, they have a getter (`getFilter`) and a setter (`setFilter`). 

[[toc]]

## Using Form Inputs
Let's see a few ways we can apply these concepts, along with Vue's `v-model`, in practice.

The following is a basic form input definition in Vue, using v-model.
```vue
<script setup>
import {ref} from "vue";
const exampleInput = ref("")
</script>
<template>
    {{ exampleInput }}
    <label for="example_input">Example Input</label>
    <input id="example_input" v-model="exampleInput" />
</template>
```

Using Harness-Vue's API and a [writeable computed](https://vuejs.org/guide/essentials/computed.html#writable-computed) function, we can achieve the same.

```vue
<script setup>
import {computed} from "vue";
import { useHarnessComposable } from "@rtidatascience/harness-vue";
const harness = useHarnessComposable();

const exampleInput = computed({
    get() {
     return harness.getFilter(props.filterKey);
    },
    set(value) {
        harness.setFilter('exampleInput', value);
    }
})
</script>
<template>
    {{ exampleInput }}
    <label for="example_input">Example Input</label>
    <input id="example_input" v-model="exampleInput" />
</template>
```

### Reuseable Filter

```vue
<script setup>
import { computed, defineProps } from "vue";
import { useHarnessComposable } from "@rtidatascience/harness-vue";
const harness = useHarnessComposable();
const props = defineProps(['filterKey']);
const filterDefinition = harness.getFilterDefinition(props.filterKey)
const boundValue = computed({
    get() {
     return harness.getFilter(props.filterKey);
    },
    set(value) {
        harness.setFilter(props.filterKey, value);
    }
})
</script>
<template>
    {{ boundValue }}
    <label :for="`${props.filterKey}-input`">{{ filterDefinition.label }}</label>
    <input :id="`${props.filterKey}-input`" v-model="boundValue" />
</template>
```

### Running `loadData()`

```vue
<script setup>
import { computed, defineProps } from "vue";
import { useHarnessComposable } from "@rtidatascience/harness-vue";
const harness = useHarnessComposable();
const props = defineProps(['filterKey']);
const filterDefinition = harness.getFilterDefinition(props.filterKey)
const boundValue = computed({
    get() {
     return harness.getFilter(props.filterKey);
    },
    set(value) {
        harness.setFilter(props.filterKey, value);
        harness.loadData();
    }
})
</script>
<template>
    {{ boundValue }}
    <label :for="`${props.filterKey}-input`">{{ filterDefinition.label }}</label>
    <input :id="`${props.filterKey}-input`" v-model="boundValue" />
</template>
```

### Select with Options

```vue
<script setup>
import { computed, defineProps } from "vue";
import { useHarnessComposable } from "@rtidatascience/harness-vue";
const harness = useHarnessComposable();
const props = defineProps(['filterKey']);
const filterDefinition = harness.getFilterDefinition(props.filterKey)
const boundValue = computed({
    get() {
     return harness.getFilter(props.filterKey);
    },
    set(value) {
        harness.setFilter(props.filterKey, value);
        harness.loadData();
    }
})
</script>
<template>
    {{ boundValue }}
    <label :for="`${props.filterKey}-input`">{{ filterDefinition.label }}</label>
    <select :id="`${props.filterKey}-input`" v-model="boundValue">
        <option 
            v-for="option in harness.getOptionsForFilter(props.filterKey)"
            :value="option.key"
            :key="option.key"
            v-html="option.label"
        />
    </select>
</template>
```
### With Multiple Values

```vue
<script setup>
import { computed, defineProps } from "vue";
import { useHarnessComposable } from "@rtidatascience/harness-vue";
const harness = useHarnessComposable();
const props = defineProps(['filterKey']);
const filterDefinition = harness.getFilterDefinition(props.filterKey)
const boundValue = computed({
    get() {
     return harness.getFilter(props.filterKey);
    },
    set(value) {
        harness.setFilter(props.filterKey, value);
        harness.loadData();
    }
})
</script>
<template>
    {{ boundValue }}
    <label :for="`${props.filterKey}-input`">{{ filterDefinition.label }}</label>
    <select 
        :id="`${props.filterKey}-input`" 
        v-model="boundValue"
        :multiple="filterDefinition?.props?.multiple"
    >
        <option 
            v-for="option in harness.getOptionsForFilter(props.filterKey)"
            :value="option.key"
            :key="option.key"
            v-html="option.label"

        />
    </select>
</template>
```