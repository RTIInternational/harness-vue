# Data Helpers

The following API functions provide common use data manipulation and statistical functionality. These functions are all mapped to the pinia store created for a given page, so they are available in a number of ways.

When using the global mixin for the options API, these will all be mapped to each component and available as `this.<function>`. In the `loadData` context, these will be available on the `pageStore` provided by the function.

[[toc]]

<a name="getValues"></a>

## getValues(data, idx)
Returns all values in a given data key/attribute, unsorted

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array/String</code> | an array of data arrays, or a string representing a chart data key |
| idx |  | the key to use for either the object attribute or array column you are trying to get values for |

<a name="getDistinctValues"></a>

## getDistinctValues(data, idx, map)
Returns an array of distinct values from an array of arrays or objects by index. If values are strings or numbers they will be sorted, and if an optional array of values is provided as a map it will be used to sort.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Array/String</code> |  | an array of data arrays, or a string representing a chart data key |
| idx | <code>String/Number</code> | <code></code> | the key to use for either the object attribute or array column you are trying to get distinct values for |
| map | <code>Array</code> | <code></code> | an array of values to use as an ordering map in sort |

<a name="applyFilterToColumn"></a>

## applyFilterToColumn(filter, column, data, allKey)
Applies the value(s) of a harness filter to a column in a given set of data and returns the filtered result

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| filter | <code>String</code> |  | a key representing a harness filter |
| column | <code>String/Number</code> |  | the column/attribute in the data to apply the filter to |
| data | <code>Array/String</code> |  | an array of data arrays, or a string representing a chart data key |
| allKey | <code>String</code> | <code></code> | a string representing a potential value for "all". If this is variable is present in the filter, the filter is not applied |

<a name="getMin"></a>

## getMin(data, idx)
Gets the minimum value from an array of data. If an index is supplied, gets the minimum for that index/attribute in the data. Only includes valid numbers in calculations.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Array/String</code> |  | an array of data/data arrays, or a string representing a chart data key |
| idx | <code>String/Number</code> | <code></code> | the optional index/attribute in the data to apply the filter to |

<a name="getMax"></a>

## getMax(data, idx)
Gets the maximum value from an array of data. If an index is supplied, gets the maximum for that index/attribute in the data.  Only includes valid numbers in calculations.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Array/String</code> |  | an array of data/data arrays, or a string representing a chart data key |
| idx | <code>String/Number</code> | <code></code> | the optional index/attribute in the data to apply the filter to |

<a name="getMedian"></a>

## getMedian(data, idx)
Gets the median of an array of data

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Array/String</code> |  | an array of data/data arrays, or a string representing a chart data key.  Only includes valid numbers in calculations. |
| idx | <code>String/Number</code> | <code></code> | the optional index/attribute in the data to apply the filter to |

<a name="getSum"></a>

## getSum(data, idx)
Gets the sum for an array of data.  Only includes valid numbers in calculations.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Array/String</code> |  | an array of data/data arrays, or a string representing a chart data key |
| idx | <code>String/Number</code> | <code></code> | the optional index/attribute in the data to apply the filter to |

<a name="getMean"></a>

## getMean(data, idx)
Gets the mean for an array of data.  Only includes valid numbers in calculations.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Array/String</code> |  | an array of data/data arrays, or a string representing a chart data key |
| idx | <code>String/Number</code> | <code></code> | the optional index/attribute in the data to apply the filter to |

<a name="getGeometricMean"></a>

## getGeometricMean(data, idx)
Gets the geometric mean for an array of data.  Only includes valid numbers in calculations.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Array/String</code> |  | an array of data/data arrays, or a string representing a chart data key |
| idx | <code>String/Number</code> | <code></code> | the optional index/attribute in the data to apply the filter to |

<a name="getQuartiles"></a>

## getQuartiles(data, idx)
Gets quartiles for an array of data. Returns in format {minimum, lowerQuartile, median, upperQuartile, maximum, IQR}.  Only includes valid numbers in calculations.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Array/String</code> |  | an array of data/data arrays, or a string representing a chart data key |
| idx | <code>String/Number</code> | <code></code> | the optional index/attribute in the data to apply the filter to |

<a name="getOutliers"></a>

## getOutliers(data, idx)
Returns truncated dataset with outliers for a given array of data. Outliers are identified as any values that equal or lower than the lower quartile - (1.5 x IQR) or
equal to or higher than the upper quartile + (1.5 x IQR).

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Array/String</code> |  | an array of data/data arrays, or a string representing a chart data key |
| idx | <code>String/Number</code> | <code></code> | the optional index/attribute in the data to apply the filter to |

<a name="removeOutliers"></a>

## removeOutliers(data, idx)
Returns truncated dataset minus outliers for a given array of data. Outliers are identified as any values that equal or lower than the lower quartile - (1.5 x IQR) or
equal to or higher than the upper quartile + (1.5 x IQR).

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Array/String</code> |  | an array of data/data arrays, or a string representing a chart data key |
| idx | <code>String/Number</code> | <code></code> | the optional index/attribute in the data to apply the filter to |

