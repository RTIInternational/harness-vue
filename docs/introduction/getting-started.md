# Getting Started

Building an application with Harness-Vue begins with defining a page. [Page Definition Files](/usage/page-definitions) are Javascript classes that Harness-Vue consumes and translates into Pinia stores. In your page definition, you'll define metadata such as [filters](/usage/filters) and [charts](/usage/charts), as well as a [loadData](/usages/lifecycle) function.


## Harness-Vue Concepts
You can think of **Filters**, **loadData** and **Charts** as a workflow.

 **Filters** are the entities that users can manipulate to interact with your dashboard. Harness-Vue filters are often represented as form controls and buttons.
 
 **Charts** house the data you use to produce visualizations, tables, and other data-driven page elements. Harness-Vue charts are often used to produce visualizations with data visualization libraries and tables.
 
 The **loadData** function is your page-level function in which a developer uses filters to retrieve, manipulate, format and return data into charts. When the Harness-Vue loadData function is called, it consumes "inputs" (filters) and produces "outputs" (charts).

 ## Page Definitions 
 The Page Definition is used to generate a Pinia store. Definitions for filters and charts shape the underlying attribute structure, and Harness-Vue getters and actions are included in the defined store to allow easy developer interactivity with Harness-Vue defined elements.

 For more information on how charts are defined and used in a Harness-Vue Page definition, see the [Working With Charts](/usage/charts) page.

 For more information on how filters are defined and used in a Harness-Vue Page definition, see the [Working With Filters](/usage/filters) page.

 For more information on the loadData function and lifecycle, see the [loadData Lifecycle](/usage/lifecycle) page.

## Components
 Additionally, the Page Definition has many attributes dedicated to storing components. This is a convenience feature to allow for less verbose and more automatically generated layouts, which are showcased in Harness-Vue-Bootstrap's [filterGrid](https://bootstrap.harnessjs.org/components/layouts/filterGrid.html) and [chartGrid](https://bootstrap.harnessjs.org/components/layouts/chartGrid.html).


## Working Example
For a working example of showcased features, try cloning and setting up the [Harness-Vue-Starter-Template](https://github.com/RTIInternational/harness-vue-starter-template). This starter template has Harness-Vue and Harness-Vue-Bootstrap preinstalled, as well as an example page definition (`/src/harness-pages/examplePage.js`).