/* eslint-disable no-console */
// eslint-disable-next-line
const pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);

export default function pages(pages) {
  // if vue in development mode, validate each page file
  // eslint-disable-next-line
  if (process.env.NODE_ENV === "development") {
    for (const Page of pages) {
      validatePageFile(new Page());
    }
  }
  return pages;
}

function validatePageFile(page) {
  const base = "Error in page " + page.key + ": ";
  validateAttributes(page, base);
  validateFilters(page, base);
  validateCharts(page.charts(), base);
  // TODO: Check that filters don't have symbols in them
}

function validateAttributes(page, base) {
  const attributes = ["title", "key", "charts", "filters", "pageComponent"];
  // check that attributes exist
  for (const attribute of attributes) {
    if (!page[attribute]) {
      console.warn(String(base + "class is missing attribute " + attribute));
    }
  }
}

function validateFilters(page, base) {
  const filters = page.filters();
  const filterKeys = [];
  for (const filterKey in filters) {
    // check that filters do not contain special characters in keys
    if (pattern.test(filterKey)) {
      console.warn(
        base + "filter key " + filterKey + " contains special characters."
      );
    }
    // check that filters have labels and options
    if (!filters[filterKey].label) {
      console.warn(base + "filter " + filterKey + " is missing label");
    }
    if (!filters[filterKey].component) {
      console.warn(base + "filter " + filterKey + " is missing component");
    }
    // check that all options have unique keys and no special characters
    const optionKeys = [];
    for (const option of filters[filterKey].options) {
      // if(pattern.test(option.key)){
      //     console.warn(base + 'filter ' + filterKey + ' option ' + option.key + ' contains special characters')
      // }
      if (optionKeys.includes(option.key)) {
        console.warn(
          base +
            "filter " +
            filterKey +
            " option " +
            option.key +
            " is not unique"
        );
      }

      optionKeys.push(option.key);
    }
    if (filterKey in filterKeys) {
      console.warn(base + "filter " + filterKey + " is not unique");
    }
    filterKeys.push(filterKey);
  }
}

function validateCharts(charts, base) {
  const chartKeys = [];
  for (const chartKey in charts) {
    if (pattern.test(chartKey)) {
      console.warn(base + "chart " + chartKey + " contains special characters");
    }
    if (chartKey in chartKeys) {
      console.warn(base + "chart " + chartKey + " is not unique");
    }
    chartKeys.push(chartKey);
    if (!charts[chartKey].component) {
      console.warn(base + "chart " + chartKey + " missing component");
    }
    if (!charts[chartKey].props) {
      console.warn(base + "chart " + chartKey + " missing component props");
    }
  }
}
