# Harness-Vue Metadata

In addition to the dynamically-generated stores created for each page, Harness-Vue also generates a `harnessStore`. This store holds metadata about the pages available via Harness-Vue. This store contains the following:


## State
* `pages`: an array of page keys installed by Harness-Vue
* `pageDefinitions`: a key/value object of page keys and page pageDefinitions
* `pageStores`: a key/value object of page keys and page store functions

## Getters
* `getPages`
* `getPageDefinitions`
* `getPageStores`

These functions can be useful for things such as navigation or other tasks that require knowing all pages in the system. This functionality is also crucial for obtaining the page stores for use outside of Harness-Vue as needed.

To access the store, import from the main library:

```javascript
import { useHarnessStore } from "@rtidatascience/harness-vue"
```