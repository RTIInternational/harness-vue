# Working with Filters

Filters in Harness-Vue are the unit of interactivity. Developers provide filters to users to manipulate data, and filters are applied in the `loadData` lifecycle. For an example filter `exampleSelect`, Harness-Vue generates the following:

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

## Options and Defaults
Filters are often represented as HTML inputs, and often have multiple options. Options are stored separately from the filter value in Harness-Vue and given their own API functions for manipulation. Harness-Vue will set an initial default option by searching the provided options for a `default: true`, or use the first available option if none are set as default explicitly. Harness-Vue also provides an `initializeDefaults()` action, which can optionally take a subset of filter keys to set to their defaults.

## Dynamic and Reusable Filters
Similar to the previous section on charts, Harness-Vue provides an API that allows a developer to dynamically reference filters by key. Using this API to refer to `getFilter(filterKey)` and `setFilter(filterKey, payload)` rather than specifying `getExampleSelectFilter`and `setExampleSelectFilter(payload)` allows developers to create reuseable HTML inputs to represent their filters. For a full list of features available for filter interaction, see [the filters API listing](/api/filters).


## Lifecycling and loadData
Given the common Harness-Vue lifecycle of running the loadData function on interaction, it is common practice to call `loadData` after `setFilter` so that data is immediately reactive to user input. This can be accomplished within the component that represents the filter by running the `loadData` function, or can be implemented in the `afterSet` functionality in the page definition.

## Dependent Filters
The `afterSet` functionality and the `loadData` function both have access to the page definition and page store, and both can be leveraged to set dependent filters. For example, if the value of `exampleSelectFilter` should be used to determine what options are populated in `exampleRadioGroup`, a developer can add functionality in `afterSet` or `loadData` that determines the correct options and sets them using `setOptionsForFilter("exampleRadioGroup", filterOptions)`.

## Data-Driven Filter Options
Another common use case is for filter options to be set dynamically from the data retrieved in the `loadData` function. Similar to the dependent filters above, a developer can leverage the `afterLoadData` page definition hook or the `loadData` function itself to generate filter options and set them with `setOptionsForFilter`.