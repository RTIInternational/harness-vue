# Filters

The following API functions allow developers to interact with filters. For more information on how to use these functions, see the [API usage page](/api/usage).

[[toc]]

<a name="module_pageStore"></a>

## pageStore

* [pageStore](#module_pageStore)
    * [.getFilter(key)](#module_pageStore.getFilter)
    * [.getFilterActionString(key)](#module_pageStore.getFilterActionString)
    * [.getFilterDefinition(key)](#module_pageStore.getFilterDefinition)
    * [.getFilterProps(key)](#module_pageStore.getFilterProps)
    * [.getLabel(key)](#module_pageStore.getLabel)
    * [.getOptionsForFilter(key)](#module_pageStore.getOptionsForFilter)
    * [.getLabelForOptionKey(filter, key)](#module_pageStore.getLabelForOptionKey)
    * [.getLabelForSelectedOption(key)](#module_pageStore.getLabelForSelectedOption)
    * [.getFilterDefault(key)](#module_pageStore.getFilterDefault)
    * [.getFilterDefaultLabel(key)](#module_pageStore.getFilterDefaultLabel)
    * [.isFilterDirty(key)](#module_pageStore.isFilterDirty)
    * [.areFiltersDirty()](#module_pageStore.areFiltersDirty)
    * [.getDirtyFilters()](#module_pageStore.getDirtyFilters)
    * [.isFilterValid(key)](#module_pageStore.isFilterValid)
    * [.setFilter(key, payload, triggerLoadData)](#module_pageStore.setFilter)
    * [.setFilterLabel(key, payload)](#module_pageStore.setFilterLabel)
    * [.setOptionsForFilter(key, payload, setOptionToDefault)](#module_pageStore.setOptionsForFilter)
    * [.setOptionPropertyToBoolean(filter, optionKeysToSet, property, bool)](#module_pageStore.setOptionPropertyToBoolean)
    * [.disableOptions(filter, optionKeys)](#module_pageStore.disableOptions)
    * [.enableOptions(filter, optionKeys)](#module_pageStore.enableOptions)
    * [.hideOptions(filter, optionKeys)](#module_pageStore.hideOptions)
    * [.showOptions(filter, optionKeys)](#module_pageStore.showOptions)

<a name="module_pageStore.getFilter"></a>

### pageStore.getFilter(key)
Returns the value for a given filter

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a filter key |

<a name="module_pageStore.getFilterActionString"></a>

### pageStore.getFilterActionString(key)
Returns the full action string for a given filter. Useful for checking in subscriptions

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a filter key |

<a name="module_pageStore.getFilterDefinition"></a>

### pageStore.getFilterDefinition(key)
Returns the filter object for a given filter key

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a filter key |

<a name="module_pageStore.getFilterProps"></a>

### pageStore.getFilterProps(key)
returns the props for a given filter, if they exist

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a filter key |

<a name="module_pageStore.getLabel"></a>

### pageStore.getLabel(key)
Returns the label for a given filter

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a filter key |

<a name="module_pageStore.getOptionsForFilter"></a>

### pageStore.getOptionsForFilter(key)
Returns the options array for a given filter

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a filter key |

<a name="module_pageStore.getLabelForOptionKey"></a>

### pageStore.getLabelForOptionKey(filter, key)
Returns the label for a given option by key

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>String</code> | a filter key |
| key | <code>String</code> | an option key for an option included in the filter |

<a name="module_pageStore.getLabelForSelectedOption"></a>

### pageStore.getLabelForSelectedOption(key)
Returns the label for a filter's selected option

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a filter key |

<a name="module_pageStore.getFilterDefault"></a>

### pageStore.getFilterDefault(key)
Returns the default option for a given filter

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a filter key |

<a name="module_pageStore.getFilterDefaultLabel"></a>

### pageStore.getFilterDefaultLabel(key)
Returns the label for the default option for a given filter

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a filter key |

<a name="module_pageStore.isFilterDirty"></a>

### pageStore.isFilterDirty(key)
Returns a boolean indicating whether or not the value of state filter is equal to the value of the default. If true, the filter is no longer set to default.

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a filter key |

<a name="module_pageStore.areFiltersDirty"></a>

### pageStore.areFiltersDirty()
Returns a boolean indicating whether or not any filters on the page have been set to a value other than their default

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  
<a name="module_pageStore.getDirtyFilters"></a>

### pageStore.getDirtyFilters()
Returns an array of filter keys for dirty filters

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  
<a name="module_pageStore.isFilterValid"></a>

### pageStore.isFilterValid(key)
Returns a boolean indicating whether or not the value of state filter is valid
Validity is calculated using a specified valueType and/or valueValidator on the filter definition
A filter with neither always returns true

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a filter key |

<a name="module_pageStore.setFilter"></a>

### pageStore.setFilter(key, payload, triggerLoadData)
Sets a given filter's value

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | <code>String</code> |  | a filter key |
| payload | <code>any</code> |  | a payload to set |
| triggerLoadData | <code>Boolean</code> | <code>true</code> | optional variable, if true will trigger a loadData action |

<a name="module_pageStore.setFilterLabel"></a>

### pageStore.setFilterLabel(key, payload)
Sets a given filter's label

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | a filter key |
| payload | <code>any</code> | a payload to set |

<a name="module_pageStore.setOptionsForFilter"></a>

### pageStore.setOptionsForFilter(key, payload, setOptionToDefault)
Sets the options for a given filter to the array provided as payload

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | <code>String</code> |  | a filter key |
| payload | <code>Array</code> |  | a payload to set |
| setOptionToDefault | <code>Boolean</code> | <code>false</code> | optional variable, if true will set the filter default |

<a name="module_pageStore.setOptionPropertyToBoolean"></a>

### pageStore.setOptionPropertyToBoolean(filter, optionKeysToSet, property, bool)
Set disabled property to true or false on each filter

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>String</code> | a filter key |
| optionKeysToSet | <code>Array</code> | an array of optionKeys |
| property | <code>String</code> | the name of the property |
| bool | <code>Boolean</code> | the boolean value to apply to the property |

<a name="module_pageStore.disableOptions"></a>

### pageStore.disableOptions(filter, optionKeys)
Set disabled property to false for given options

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>String</code> | a filter key |
| optionKeys | <code>Array</code> | an array of optionKeys |

<a name="module_pageStore.enableOptions"></a>

### pageStore.enableOptions(filter, optionKeys)
Set disabled property to false for given options

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>String</code> | a filter key |
| optionKeys | <code>Array</code> | an array of optionKeys |

<a name="module_pageStore.hideOptions"></a>

### pageStore.hideOptions(filter, optionKeys)
Set hidden property to true for given options

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>String</code> | a filter key |
| optionKeys | <code>Array</code> | an array of optionKeys |

<a name="module_pageStore.showOptions"></a>

### pageStore.showOptions(filter, optionKeys)
Set hidden property to false for given options

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>String</code> | a filter key |
| optionKeys | <code>Array</code> | an array of optionKeys |

