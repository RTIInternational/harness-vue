# Lifecycle

The following API functions allow developers to interact with the Harness-Vue lifecycle. For more information on how to use these functions, see the [API usage page](/api/usage).

<a name="module_pageStore"></a>

## pageStore

* [pageStore](#module_pageStore)
    * [.setRequestCache(payload)](#module_pageStore.setRequestCache)
    * [.toggleDataLoading()](#module_pageStore.toggleDataLoading)
    * [.loadData()](#module_pageStore.loadData)
    * [.clearData()](#module_pageStore.clearData)
    * [.initializeDefaults(payload)](#module_pageStore.initializeDefaults)

<a name="module_pageStore.setRequestCache"></a>

### pageStore.setRequestCache(payload)
**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>any</code> | sets the request cache to the given payload |

<a name="module_pageStore.toggleDataLoading"></a>

### pageStore.toggleDataLoading()
Flips the data loading boolean

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  
<a name="module_pageStore.loadData"></a>

### pageStore.loadData()
Runs the load data function for a given page

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  
<a name="module_pageStore.clearData"></a>

### pageStore.clearData()
Sets the data for all charts to null

**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  
<a name="module_pageStore.initializeDefaults"></a>

### pageStore.initializeDefaults(payload)
**Kind**: static method of [<code>pageStore</code>](#module_pageStore)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| payload | <code>Array</code> | <code></code> | Initializes the defaults for all filters. If an array of filter keys is provided, only those filters will be initialized |

