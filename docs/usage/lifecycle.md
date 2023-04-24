# The loadData Lifecycle

The Harness-Vue lifecycle revolves around the `loadData` function. This function, defined in each page definition, centralizes the interaction between charts and filters into one reusable function that can be called predictably. Think of the `loadData` function as a centralized action to take when page state changes - whether that be from user interaction like pressing a button or changing an input, or from something as simple as the page refreshing.

## The loadData Function
The `loadData` function accepts two arguments: `pageDefinition` and `pageStore`, representing the definition of the page (charts, filters, metadata) as well as the pinia store representing the page this function is being run for (meaning you can re-use a `loadData` function across pages - it'll always know which page it's running for!). The output of this function should be an object with data for each chart registered on the page, which Harness-Vue then sets to each state attribute in the store. 

## Example
Imagine an example page file that has the following:

* two filters, `groupBy` and `dataSource` which determine how to group and where to retrieve data from, respectively
* two charts, `timeseries` and `pieChart` which show the data over time and the data by grouping, respectively.

The data API that this dashboard application sources its data from does not contain parameters for grouping, so that has to be applied by the developer.

In the components representing the `groupBy` and `dataSource` filters, `loadData` is called after the filter is set.

An example `loadData` function for this page could look like so:

```javascript
import  { groupByMetric, formatForTimeseries, formatForPieChart } from './utils'

export default async function loadData(pageDefinition, pageStore) {
    // STEP 1: Retrieve the data
    const apiUrl = `https://api.com/endpoint/${pageStore.getFilter('dataSource')}`
    let data = await fetch(apiUrl).then(response => response.json())

    // STEP 2: Group the data
    groupedData = groupByMetric(data, pageStore.getfilter('groupBy'))

    // STEP 3: Format the data for visualization libraries
    const timeseriesData = formatForTimeseries(groupedData)
    const pieChartChartData = formatForPieChart(groupedData)

    // STEP 4: Return the data for each chart
    return {
        timeseries: timeseriesData,
        pieChart: pieChartData
    }
}
```

Internally, this will call `setChartData('timeseries', timeseriesData)` and `setChartData('pieChart', pieChartData)`. Because this sets attributes in Pinia, we can rely on Vue's reactivity to expect updates! If these chart components are using `getChartData('timeseries')` and `getChartData('pieChart')` to display data in their visualizations, this will all update automatically.

## Memoization
For ease of memoization, each page is given a `requestCache` state attribute (with `getRequestCache` getter and `setRequestCache` actions). In Harness-Vue applications, this attribute is used to house data that should not be retrieved or computed again. For example, if your page retrieves a json file from an API endpoint and uses the values of your Harness-Vue filters to sort and slice the data before passing it to Harness-Vue charts for display, it is best practice to store your request output in the `requestCache` and check for it at each subsequent run of `loadData` rather than make another request to retrieve data you've already retrieved.

In the above example, if a user were to change the `groupBy` filter but not the `dataSource` filter, we would retrieve the data unnecessarily. Let's see how we can use `requestCache` to memoize this feature:

```javascript
import  { groupByMetric, formatForTimeseries, formatForPieChart } from './utils'

export default async function loadData(pageDefinition, pageStore) {
    // STEP 1: Check to see if the request cache has been instantiated
    if(pageStore.getRequestCache === null) {
        pageStore.setRequestCache({})
    }
    let data = null
    // if we've already retrieved this data, take it from the cache
    if(pageStore.getRequestCache[pageStore.getFilter('dataSource')]) {
        data = pageStore.getRequestCache[pageStore.getFilter('dataSource')]
    } else {
        // if not, retrieve it from the api
        const apiUrl = `https://api.com/endpoint/${pageStore.getFilter('dataSource')}`
        data = await fetch(apiUrl).then(response => response.json())
        // set it to the cache for next time
        pageStore.setRequestCache({
            pageStore.getFilter('dataSource'): data,
            ...pageStore.getRequestCache
        })
    }
    
    // STEP 2: Group the data
    groupedData = groupByMetric(data, pageStore.getfilter('groupBy'))

    // STEP 3: Format the data for visualization libraries
    const timeseriesData = formatForTimeseries(groupedData)
    const pieChartChartData = formatForPieChart(groupedData)

    // STEP 4: Return the data for each chart
    return {
        timeseries: timeseriesData,
        pieChart: pieChartData
    }
}
```