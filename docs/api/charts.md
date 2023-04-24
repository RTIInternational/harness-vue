# Charts

The following API functions allow developers to interact with charts. For more information on how to use these functions, see the [API usage page](/api/usage).

[[toc]]

<a name="module_pageStore"></a>

## pageStore

* [pageStore](#module_pageStore)
    * [.getChartDefinition(key)](#module_pageStore.getChartDefinition)
    * [.getChartData(key)](#module_pageStore.getChartData)
    * [.getChartDataActionString(key)](#module_pageStore.getChartDataActionString)
    * [.getChartProps(key)](#module_pageStore.getChartProps)
    * [.validateChartData(data, key)](#module_pageStore.validateChartData)
    * [.setChartData(key)](#module_pageStore.setChartData)
    * [.generateCSV(key, returnFormat)](#module_pageStore.generateCSV)
    * [.downloadCSV(key)](#module_pageStore.downloadCSV)

<a name="module_pageStore.getChartDefinition"></a>

### pageStore.getChartDefinition(key)
Returns the chart object for a given key

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a chart key |

<a name="module_pageStore.getChartData"></a>

### pageStore.getChartData(key)
Returns data for a given chart

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a chart key |

<a name="module_pageStore.getChartDataActionString"></a>

### pageStore.getChartDataActionString(key)
Returns the full action string for a given chart. Useful for checking in subscriptions

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a chart key |

<a name="module_pageStore.getChartProps"></a>

### pageStore.getChartProps(key)
Returns the props for a given chart if they exist

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a chart key |

<a name="module_pageStore.validateChartData"></a>

### pageStore.validateChartData(data, key)
Validates that data is formatted correctly for the downloadCSV function (an array of objects)

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>any</code> | the data to be validated. If null, it will not validate (for lifecyle) |
| key |  | the key for this data's chart |

<a name="module_pageStore.setChartData"></a>

### pageStore.setChartData(key)
Sets data for a given chart

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a chart key |

<a name="module_pageStore.generateCSV"></a>

### pageStore.generateCSV(key, returnFormat)
Generates a csv of a given table, optionally formatted through a chart's tableAdapter prop

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a chart key |
| returnFormat | <code>String</code> | format to generate the CSV in |

<a name="module_pageStore.downloadCSV"></a>

### pageStore.downloadCSV(key)
Downloads a csv of a given table, optionally formatted through a chart's tableAdapter prop.
If a chartTitle prop exists, the csv will be generated using that as the file name

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a chart key |

