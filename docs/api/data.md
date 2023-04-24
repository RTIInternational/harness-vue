# Data Helpers

The following API functions provide common use data manipulation and statistical functionality. For more information on how to use these functions, see the [API usage page](/api/usage).

[[toc]]

<a name="module_pageStore"></a>

## pageStore

* [pageStore](#module_pageStore)
    * [.getValues(data, idx)](#module_pageStore.getValues)
    * [.getDistinctValues(data, idx, map, sort)](#module_pageStore.getDistinctValues)
    * [.applyFilterToColumn(filter, column, data, allKey)](#module_pageStore.applyFilterToColumn)
    * [.getMin(data, idx)](#module_pageStore.getMin)
    * [.getMax(data, idx)](#module_pageStore.getMax)
    * [.getMedian(data, idx)](#module_pageStore.getMedian)
    * [.getSum(data, idx)](#module_pageStore.getSum)
    * [.getMean(data, idx)](#module_pageStore.getMean)
    * [.getGeometricMean(data, idx)](#module_pageStore.getGeometricMean)
    * [.getQuartiles(data, idx)](#module_pageStore.getQuartiles)
    * [.getOutliers(data, idx)](#module_pageStore.getOutliers)
    * [.removeOutliers(data, idx)](#module_pageStore.removeOutliers)

<a name="module_pageStore.getValues"></a>

### pageStore.getValues(data, idx)
Returns all values in a given data key/attribute, unsorted

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array/String</code> | an array of data arrays, or a string representing a chart data key |
| idx |  | the key to use for either the object attribute or array column you are trying to get values for |

<a name="module_pageStore.getDistinctValues"></a>

### pageStore.getDistinctValues(data, idx, map, sort)
Returns an array of distinct values from an array of arrays or objects by index. If values are strings or numbers they will be sorted, and if an optional array of values is provided as a map it will be used to sort. Sorting can be disabled by setting <code>sort = false</code>.

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Array/String</code> |  | an array of data arrays, or a string representing a chart data key |
| idx | <code>String/Number</code> | <code></code> | the key to use for either the object attribute or array column you are trying to get distinct values for |
| map | <code>Array</code> | <code></code> | an array of values to use as an ordering map in sort |
| sort | <code>Boolean</code> | <code>true</code> | boolean to check whether to sort the returning distinct values |

<a name="module_pageStore.applyFilterToColumn"></a>

### pageStore.applyFilterToColumn(filter, column, data, allKey)
Applies the value(s) of a harness filter to a column in a given set of data and returns the filtered result

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| filter | <code>String</code> |  | a key representing a harness filter |
| column | <code>String/Number</code> |  | the column/attribute in the data to apply the filter to |
| data | <code>Array/String</code> |  | an array of data arrays, or a string representing a chart data key |
| allKey | <code>String</code> | <code></code> | a string representing a potential value for "all". If state is variable is present in the filter, the filter is not applied |

<a name="module_pageStore.getMin"></a>

### pageStore.getMin(data, idx)
Gets the minimum value from an array of data. If an index is supplied, gets the minimum for that index/attribute in the data. Only includes valid numbers in calculations.

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Array/String</code> |  | an array of data/data arrays, or a string representing a chart data key |
| idx | <code>String/Number</code> | <code></code> | the optional index/attribute in the data to apply the filter to |

<a name="module_pageStore.getMax"></a>

### pageStore.getMax(data, idx)
Gets the maximum value from an array of data. If an index is supplied, gets the maximum for that index/attribute in the data.  Only includes valid numbers in calculations.

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Array/String</code> |  | an array of data/data arrays, or a string representing a chart data key |
| idx | <code>String/Number</code> | <code></code> | the optional index/attribute in the data to apply the filter to |

<a name="module_pageStore.getMedian"></a>

### pageStore.getMedian(data, idx)
Gets the median of an array of data

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Array/String</code> |  | an array of data/data arrays, or a string representing a chart data key.  Only includes valid numbers in calculations. |
| idx | <code>String/Number</code> | <code></code> | the optional index/attribute in the data to apply the filter to |

<a name="module_pageStore.getSum"></a>

### pageStore.getSum(data, idx)
Gets the sum for an array of data.  Only includes valid numbers in calculations.

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Array/String</code> |  | an array of data/data arrays, or a string representing a chart data key |
| idx | <code>String/Number</code> | <code></code> | the optional index/attribute in the data to apply the filter to |

<a name="module_pageStore.getMean"></a>

### pageStore.getMean(data, idx)
Gets the mean for an array of data.  Only includes valid numbers in calculations.

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Array/String</code> |  | an array of data/data arrays, or a string representing a chart data key |
| idx | <code>String/Number</code> | <code></code> | the optional index/attribute in the data to apply the filter to |

<a name="module_pageStore.getGeometricMean"></a>

### pageStore.getGeometricMean(data, idx)
Gets the geometric mean for an array of data.  Only includes valid numbers in calculations.

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Array/String</code> |  | an array of data/data arrays, or a string representing a chart data key |
| idx | <code>String/Number</code> | <code></code> | the optional index/attribute in the data to apply the filter to |

<a name="module_pageStore.getQuartiles"></a>

### pageStore.getQuartiles(data, idx)
Gets quartiles for an array of data. Returns in format {minimum, lowerQuartile, median, upperQuartile, maximum, IQR}.  Only includes valid numbers in calculations.

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Array/String</code> |  | an array of data/data arrays, or a string representing a chart data key |
| idx | <code>String/Number</code> | <code></code> | the optional index/attribute in the data to apply the filter to |

<a name="module_pageStore.getOutliers"></a>

### pageStore.getOutliers(data, idx)
Returns truncated dataset with outliers for a given array of data. Outliers are identified as any values that equal or lower than the lower quartile - (1.5 x IQR) or
equal to or higher than the upper quartile + (1.5 x IQR).

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Array/String</code> |  | an array of data/data arrays, or a string representing a chart data key |
| idx | <code>String/Number</code> | <code></code> | the optional index/attribute in the data to apply the filter to |

<a name="module_pageStore.removeOutliers"></a>

### pageStore.removeOutliers(data, idx)
Returns truncated dataset minus outliers for a given array of data. Outliers are identified as any values that equal or lower than the lower quartile - (1.5 x IQR) or
equal to or higher than the upper quartile + (1.5 x IQR).

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Array/String</code> |  | an array of data/data arrays, or a string representing a chart data key |
| idx | <code>String/Number</code> | <code></code> | the optional index/attribute in the data to apply the filter to |

