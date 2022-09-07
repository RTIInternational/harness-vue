# Charts

The following API functions allow developers to interact with charts. These functions are all mapped to the pinia store created for a given page, so they are available in a number of ways.

When using the global mixin for the options API, these will all be mapped to each component and available as `this.<function>`. In the `loadData` context, these will be available on the `pageStore` provided by the function.

[[toc]]

<a name="getChartDefinition"></a>

## getChartDefinition(key)
Returns the chart object for a given key

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a chart key |

<a name="getChartData"></a>

## getChartData(key)
Returns data for a given chart

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a chart key |

<a name="setChartData"></a>

## setChartData(key)
Sets data for a given chart

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a chart key |

<a name="getChartDataActionString"></a>

## getChartDataActionString(key)
Returns the full action string for a given chart. Useful for checking in subscriptions

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a chart key |

<a name="getChartProps"></a>

## getChartProps(key)
Returns the props for a given chart if they exist

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a chart key |

<a name="validateChartData"></a>

## validateChartData(data, key)
Validates that data is formatted correctly for the downloadCSV function (an array of objects)

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>any</code> | the data to be validated. If null, it will not validate (for lifecyle) |
| key |  | the key for this data's chart |

<a name="generateCSV"></a>

## generateCSV(key, returnFormat)
Generates a csv of a given table, optionally formatted through a chart's tableAdapter prop

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a chart key |
| returnFormat | <code>String</code> | format to generate the CSV in |

<a name="downloadCSV"></a>

## downloadCSV(key)
Downloads a csv of a given table, optionally formatted through a chart's tableAdapter prop.
If a chartTitle prop exists, the csv will be generated using that as the file name

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a chart key |

