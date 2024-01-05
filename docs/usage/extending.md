# Extending The Harness-Vue Store

Given that the Harness-Vue store is a pinia instance, there are times in which it is useful for a developer to extend the store itself with additional arbitrary values. In order to do so, harness-vue will consume extended getters, actions, state and subscription if included in the page definition.

## Getters
To add getters to the pinia store, provide an `extendGetters` attribute to your page definition. These getters should conform to [the expected Pinia getter syntax](https://pinia.vuejs.org/core-concepts/getters.html).

```js
export default class ExamplePage {
    filters = () => {
        return {
            startDate: {},
            endDate: {}
        }
    }
    extendGetters = () => {
        return {
            getDateRangeString(state) {
                return `${state.getFilter('startDate')} - ${state.getFilter('endDate')}`;
            }
        }
    }
}
```
```js
pageStore.setFilter("startDate", "01-01-2024")
pageStore.setFilter("endDate", "01-31-2024")
console.log(pageStore.getDateRangeString)
// "01-01-2024 - 01-31-2024"
```

## Actions
To add actions to the pinia store, provide an `extendActions` attribute to your page definition. These getters should conform to [the expected Pinia action syntax](https://pinia.vuejs.org/core-concepts/actions.html).

```js
export default class ExamplePage {
    filters = () => {
            return {
                filter1: {options: [{key: "first", label: "first"}]}
            }
    }

    extendActions = () => {
        return {
            async addOptionsToFilter(filterKey){
                const options = await fetch(`/options/${filterKey}`).then(d => d.json())
                const optionMap = options.map((option) => ({key: option, label: option}))
                const finalOptions = [...this.getOptionsForFilter(filterKey), ...optionMap]
                this.setOptionsForFilter(filterKey, finalOptions)
            }
        }
    }
}
```
```js
// expecting server to return ["second", "third"]
pageStore.addOptionsToFilter("filter1")
console.log(pageStore.getOptionsForFilter("filter1"))
// [
//  {key: "first", label: "first"},
//  {key: "second", label: "second"},
//  {key: "third", label: "third"},
// ]
```

## State
To add to the state in the pinia store, provide an `extendState` attribute to your page definition. These returned object should conform to [the expected Pinia state syntax](https://pinia.vuejs.org/core-concepts/state.html).

```js
import {ref} from "vue"
export default class ExamplePage {
    extendState = () => {
        return {
            index: ["a", "b", "c"]
        }
    }

    loadData = async function(pageStore, pageDefinition) {
        console.log(pageStore.index)
    }
}
```

```js
pageStore.loadData();
// ["a", "b", "c"]
```

## Subscriptions
Additionally, a provided `extendSubscriptions` function will be consumed by Harness-Vue and run as a subscription on the store's actions. This should conform to the [Pinia action subscription syntax](https://pinia.vuejs.org/core-concepts/actions.html#Subscribing-to-actions). This function will be run both "before" and "after" the action, though it will be provided with a variable informing it whether or not it is running before or after.

Arguments:
* name: the name of the action that fired
* args: the arguments provided to the action
* store: the harness-vue page store
* pageDefinition: the harness-vue page definition
* `hook`: either `"before"` or `"after"`

As a note, Harness-Vue is already providing subscriptions for filters, charts and loadData via the `beforeSet`/`afterSet` syntax on charts and filters and the `beforeLoadData` and `afterLoadData` syntax.