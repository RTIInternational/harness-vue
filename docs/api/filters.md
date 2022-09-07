# Charts

The following API functions allow developers to interact with filters. These functions are all mapped to the pinia store created for a given page, so they are available in a number of ways.

When using the global mixin for the options API, these will all be mapped to each component and available as `this.<function>`. In the `loadData` context, these will be available on the `pageStore` provided by the function.

[[toc]]

<a name="setFilter"></a>

## setFilter(key, payload)
Sets a given filter's value

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a filter key |
| payload | <code>any</code> | a payload to set |

<a name="getFilterActionString"></a>

## getFilterActionString(key)
Returns the full action string for a given filter. Useful for checking in subscriptions

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a filter key |

<a name="getFilterDefinition"></a>

## getFilterDefinition(key)
Returns the filter object for a given filter key

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a filter key |

<a name="getFilterProps"></a>

## getFilterProps(key)
returns the props for a given filter, if they exist

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a filter key |

<a name="getLabel"></a>

## getLabel(key)
Returns the label for a given filter

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a filter key |

<a name="getOptionsForFilter"></a>

## getOptionsForFilter(key)
Returns the options array for a given filter

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a filter key |

<a name="setOptionsForFilter"></a>

## setOptionsForFilter(key, payload, setOptionToDefault)
Sets the options for a given filter to the array provided as payload

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | <code>String</code> |  | a filter key |
| payload | <code>Array</code> |  | a payload to set |
| setOptionToDefault | <code>Boolean</code> | <code>false</code> | optional variable, if true will set the filter default |

<a name="getLabelForOptionKey"></a>

## getLabelForOptionKey(filter, key)
Returns the label for a given option by key

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>String</code> | a filter key |
| key | <code>String</code> | an option key for an option included in the filter |

<a name="getLabelForSelectedOption"></a>

## getLabelForSelectedOption(key)
Returns the label for a filter's selected option

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a filter key |

<a name="setOptionPropertyToBoolean"></a>

## setOptionPropertyToBoolean(filter, optionKeysToSet, property, bool)
Set disabled property to true or false on each filter

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>String</code> | a filter key |
| optionKeysToSet | <code>Array</code> | an array of optionKeys |
| property | <code>String</code> | the name of the property |
| bool | <code>Boolean</code> | the boolean value to apply to the property |

<a name="disableOptions"></a>

## disableOptions(filter, optionKeys)
Set disabled property to false for given options

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>String</code> | a filter key |
| optionKeys | <code>Array</code> | an array of optionKeys |

<a name="enableOptions"></a>

## enableOptions(filter, optionKeys)
Set disabled property to false for given options

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>String</code> | a filter key |
| optionKeys | <code>Array</code> | an array of optionKeys |

<a name="hideOptions"></a>

## hideOptions(filter, optionKeys)
Set hidden property to true for given options

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>String</code> | a filter key |
| optionKeys | <code>Array</code> | an array of optionKeys |

<a name="showOptions"></a>

## showOptions(filter, optionKeys)
Set hidden property to false for given options

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>String</code> | a filter key |
| optionKeys | <code>Array</code> | an array of optionKeys |

<a name="getFilterDefault"></a>

## getFilterDefault(key)
Returns the default option for a given filter

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a filter key |

<a name="getFilterDefaultLabel"></a>

## getFilterDefaultLabel(key)
Returns the label for the default option for a given filter

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a filter key |

<a name="isFilterDirty"></a>

## isFilterDirty(key)
Returns a boolean indicating whether or not the value of this filter is equal to the value of the default. If true, the filter is no longer set to default.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a filter key |

<a name="areFiltersDirty"></a>

## areFiltersDirty()
Returns a boolean indicating whether or not any filters on the page have been set to a value other than their default

**Kind**: global function  
<a name="getDirtyFilters"></a>

## getDirtyFilters()
Returns an array of filter keys for dirty filters

**Kind**: global function  
