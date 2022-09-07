# Working with Charts

Working with charts in Harness Vue is relatively simple. For a given chart `exampleChart1`, Harness Vue will create:

* a state attribute for `exampleChart1ChartData`
* a getter `getExampleChart1ChartData`
* a setter action `setExampleChart1ChartData`
* an action subscription for `setExampleChart1ChartData` that runs the `beforeSet` and `afterSet` functions present in the page definition


## Loading Chart Data
It's generally expected that chart data will be loaded by the `loadData` function following the Harness Vue lifecycle, so developers don't typically interact with chart data outside of that context. Typically, all filters on a page are defined as Harness Vue page-level filters, and the application of filters to charts is done witin the `loadData` function, but a developer may choose to have chart-level filters that are not defined within Harness Vue that apply transformations to chart data using the getters and setters listed above. It is recommended to always use the setter action rather than mutating state directly so as not to be inconsistent with action subscriptions.

## Reading Chart Data
Given that the chart data state created by Harness Vue is based in Pinia, it is inherently reactive. Using the visualization library of your choice, one can simply refer to the getter (`getExampleChart1ChartData` in our example) and expect that it is reactive and will update automatically.


## Dynamic and Reusable Charts
However, as explained in the [More Reusable Components](/introduction/#more-usable-components) section of the introduction, developers can leverage the Harness Vue API to refer to charts dynamically as well. The Harness Vue API provides functions such as `getChartData` and `setChartData` that allow a developer to write chart-agnostic components. For example, on a given page with `exampleChart1` and `exampleChart2`, rather than write one component sourced from `getExampleChart1ChartData` and one sourced from `exampleChart2ChartData` that each have their own data retrieval methods, a developer using Harness Vue can write a component that sources data from `this.getChartData(this.chartKey)` where `chartKey` is a prop. Because loading and transforming the data is already abstracted from components by the `loadData` lifecycle, this allows developers to write lightweight components for their charts that are more concerned with display than data retrieval and formatting.

For a full list of features available to interact with chart data, see the [charts API listing](/api/charts), as well as the [Data and Statistics Helpers](/api/data) for more information.

## Structured Data and Tables
Data visualization is a powerful tool, but some applications still require that users be able to view and even download the data driving a visualization. This can be important for Section 508 compliance and user experience, but made difficult given the requirements of some visualization libraries. For example, see this [Highcharts Demo Basic line chart](https://www.highcharts.com/demo/line-basic): 

```js
Highcharts.chart('container', {
    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2010
        }
    },

    series: [{
        name: 'Installation & Developers',
        data: [43934, 48656, 65165, 81827, 112143, 142383,
            171533, 165174, 155157, 161454, 154610]
    }, {
        name: 'Manufacturing',
        data: [24916, 37941, 29742, 29851, 32490, 30282,
            38121, 36885, 33726, 34243, 31050]
    }, {
        name: 'Sales & Distribution',
        data: [11744, 30000, 16005, 19771, 20185, 24377,
            32147, 30912, 29243, 29213, 25663]
    }, {
        name: 'Operations & Maintenance',
        data: [null, null, null, null, null, null, null,
            null, 11164, 11218, 10077]
    }, {
        name: 'Other',
        data: [21908, 5548, 8105, 11248, 8989, 11816, 18274,
            17300, 13053, 11906, 10073]
    }]
});
```

For this example, let's assume that the contents of `series` is the output of our `getChartData()` function, so the contents of our `exampleChart1` chart data. Each entry in the `data` array for each `series` object contains the data, which are mapped to years starting at 2010. If we were to provide this table to a user, we would expect a column per year and row per series (or vice-versa).

For this use case, Harness Vue expects each chart to (optionally) include a `tableAdapter()` function in the chart props. This function is expected to take four arguments: (`chartDefinition`, `filters`, `chartData`, `pageStore`). The output of this function should be an array of objects in which each object is expected to be key/value pairs. Each object will be treated as a table row, with each key being a column and each value being the value. The first row will be inspected to generate the table header.

If a component is required to display both a visualization and a table, using `getChartData()` and `tableAdapter()` in tandem allows for this functionality.

## CSV Data Downloads
Internally, Harness Vue uses the `tableAdapter` functionality to generate a CSV download for charts. Harness Vue makes two methods available:

* `generateCSV(chartKey, format)`, where acceptable formats are `string` and `blob` (default `string`) that generates the CSV and returns it for a developer to use
* `downloadCSV(chartKey)`, which calls `generateCSV(chartKey, "blob")` and downloads it using the [file-saver](https://www.npmjs.com/package/file-saver) library.