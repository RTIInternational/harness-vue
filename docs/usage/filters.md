# Working with Filters

Filters in Harness-Vue are the main unit of interactivity. Often mapped to HTML form controls, filters in Harness-Vue are changeable data elements that represent user input in a dashboard context. Harness-Vue's filters are designed for common input functionality, and the API provides a number of functions for manipulating filter inputs. Typically, filter data values are consumed in the `loadData` function, where they are used to shape the data that is passed along to charts for eventual visualization.

## Example 

```javascript
{
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
                },
                valueType: "string",
                valueValidator: (pageStore, value) => {
                    return value.includes("exampleOption");
                }
            },
        }
    }
}
```

The `filters` attribute on a Harness-Vue page definition is a function that returns an object containing key/value pairs representing filters. A filter is keyed, and the key (`exampleSelect` above) is how the filter is referenced in API functions. A filter can also contain the following attributes:

* `label`: A string most often used to render the label in a form control
* `component`: The component expected to be rendered for this filter (either a string referencing a globally-registered component, or a component definition)
* `defaultValue`: A default value for the filter
* `options`: An array of options available to this filter, most often used in form controls like checkbox groups and selects
* `props`: an object containing props meant to be passed to the rendered component
* `valueType`: a string representation of the data type of the filter, such as `string`, `number`, `array` or `object`
* `valueValidator`: a function to calculate validity for a given filter's value
* `beforeSet`: a function to run before a filter's value is altered
* `afterSet`: a function to run after a filter's value is altered

## Usage

### Multiple
A filter with the prop `multiple: true` will be treated as having multiple values. The filter value will be treated as an array by all API functions.

### Options 
Options in a Harness-Vue filter are stored as an array of objects, in which each object has three possible keys: 
* `key`: the value to set when this option is selected
* `label`: the label to render when presenting a user with this option
* `default` (optional) `true`/`false`

Options are most often used to render form controls such as selects, radios and checkbox groups. However, not all filters need options, and as such they are optional.

Options can be interacted with and loaded dynamically. For example, the contents of options may change based on the value of a different filter (often through the `beforeSet` or `afterSet` syntax), or be loaded and manipulated in a `loadData` function with the `setOptionsForFilter` API function.

 See the [API Documentation for Filters](/api/filters.html) for a number of API functions relating to options, including getters/setters and functionality for setting properties on options used to inform your components of state such as `hidden` and `disabled`.

### Defaults
When a Harness-Vue page store is instantiated, or when certain API functions such as `initializeDefaults()` are called, Harness-Vue will determine the default value of a given filter. It does so in the following order of priority:

* `defaultValue` is set
* an option/options have `default: true`
* the first option

### Validation
Developers can provide two attributes to a Harness-Vue filter that drive the output of the `isFilterValid` API function. This function will check if `typeOf` the filter value is equal to an optionally-provided `valueType`, and will additionally run an optionally-provided `valueValidator` function. In components rendering filters, developers can use this `isFilterValid` getter to reflect validity in their interface.

### Subscriptions
Developers can additionally provide a `beforeSet` or `afterSet` function to any given filter, which will run before/after a filter is set. These functions are provided two positional arguments `action` (the pinia action triggering the function) and `store` (the Harness-Vue page store). This can be used for things such as dependent filters or running `loadData`.

#### Dependent Filter Example
In this example, when a user changes the value of `filterA`, it will set the value of `filterB` to `null`.
```javascript
    {
        filters = () => {
            return {
                filterA: {
                    // attributes excluded for brevity
                    afterSet(action, store) {
                        store.setFilter("filterB", null)
                    }
                },
                filterB: {
                    // attributes excluded for brevity
                }
            }
        }
    }
```
#### Triggering loadData
In this example, we trigger `loadData` after `filterA` is changed.
```javascript
    {
        filters = () => {
            return {
                filterA: {
                    // attributes excluded for brevity
                    afterSet(action, store) {
                        store.loadData();
                    }
                }
            }
        }
    }
```

## Writing Filter Components
While many projects use [Harness-Vue-Bootstrap](https://bootstrap.harnessjs.org)'s component library for filter components, it is not uncommon to write bespoke filter components in a given application. These can vary in complexity, but often have a few common attributes of note:

### Re-Use
Passing in the filter's key (or definition) as a prop and using the filter key in API functions can allow for reuseable filters.


#### Example
For this example, we will define a component called `reuseableTextInput`:

```vue
<script setup>
    import { useHarnessComposable } from "@rtidatascience/harness-vue"
    import { computed, defineProps } from "vue";

    const harness = useHarnessComposable():

    const props = defineProps({
        filterKey: {required: true},
        filterDefinition: { required: true }
    })
    
    const boundValue = computed({
        get(){
            return harness.getFilter(props.filterKey)
        },
        set(value){
            harness.setFilter(props.filterKey, value)
        }
    })
</script>
<template>
    <label :for="props.filterKey">{{props.filterDefinition.label}}</label>
    <input type="text" :id="props.filterKey" v-model="boundValue"/>
</template>
```

We can now render that for two different components in a given page:
```vue
<script setup>
import reuseableFilter from "reuseableFilter.vue"
import { useHarnessComposable } from "@rtidatascience/harness-vue"
const harness = useHarnessComposable():
</script>
<template>
<div>
    <reuseableFilter :filterKey="filter1" :filterDefinition="harness.getFilterDefinition('filter1')"/>
    <reuseableFilter :filterKey="filter2" :filterDefinition="harness.getFilterDefinition('filter2')"/>
</div>
</template>
```

## Under The Hood
 For an example filter `exampleSelect`, Harness-Vue generates the following:

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
