import { describe, expect, it } from "vitest";
import { mockHs, page } from "./store.spec.js";
import { capitalize } from "../src/store/utils";

describe("DV Filter functions", () => {
  it("Can Validate Filter Keys", () => {
    let hs = mockHs();
    expect(() => {
      hs._validFilterKey("filter1");
    }).not.toThrow();
    expect(() => {
      hs._validFilterKey("not a filter key");
    }).toThrow();
  });
  it("Can Get Filter Object", () => {
    let hs = mockHs();
    Object.keys(page.filters()).forEach((filterKey) => {
      expect(hs.getFilterDefinition(filterKey)).toEqual(hs.filters[filterKey]);
    });
  });
  it("Can Get Filter", () => {
    let hs = mockHs();
    Object.keys(page.filters()).forEach((filterKey) => {
      expect(hs.getFilter(filterKey)).toEqual("default");
    });
  });
  it("Can Set Filter", () => {
    let hs = mockHs();
    Object.keys(page.filters()).forEach((filterKey) => {
      hs.setFilter(filterKey, "Testing set filter");
      expect(hs.getFilter(filterKey)).toEqual("Testing set filter");
    });
  });
  it("Can Set Filter Label", () => {
    let hs = mockHs();
    Object.keys(page.filters()).forEach((filterKey) => {
      hs.setFilterLabel(filterKey, "changedLabel");
      expect(hs.getLabel(filterKey)).toEqual("changedLabel");
    });
  });
  it("Can Get Filter Action String", () => {
    let hs = mockHs();
    Object.keys(page.filters()).forEach((filterKey) => {
      let expected = `set${capitalize(filterKey)}Filter`;
      expect(hs.getFilterActionString(filterKey)).toEqual(expected);
    });
  });
  it("Can Get Filter Props", () => {
    let hs = mockHs();
    Object.keys(page.filters()).forEach((filterKey) => {
      expect(hs.getFilterProps(filterKey).test).toEqual(true);
    });
  });
  it("Can Get Filter Label", () => {
    let hs = mockHs();
    Object.keys(page.filters()).forEach((filterKey) => {
      expect(hs.getLabel(filterKey)).toEqual(page.filters()[filterKey].label);
    });
  });
  it("Can Get Options For Filter", () => {
    let hs = mockHs();
    Object.keys(page.filters()).forEach((filterKey) => {
      expect(hs.getOptionsForFilter(filterKey)).toEqual(
        page.filters()[filterKey].options,
      );
    });
  });
  it("Can Set Options For Filter", () => {
    let hs = mockHs();
    Object.keys(page.filters()).forEach((filterKey) => {
      let testOptions = [{ key: "test", label: "Test", default: true }];
      hs.setOptionsForFilter(filterKey, testOptions);
      expect(hs.getOptionsForFilter(filterKey)).not.toEqual(
        page.filters()[filterKey].options,
      );
      expect(hs.getOptionsForFilter(filterKey)).toEqual(testOptions);
    });
  });
  it("Can Set Default Option", () => {
    let hs = mockHs();
    // TEST CASE 1: Explicit Default
    hs.initializeDefaults(["testDefaultValue"]);
    const filterToTest = hs.getFilterDefinition("testDefaultValue");
    expect(hs.getFilter("testDefaultValue")).toEqual("default");
    // note that this is not a pattern to follow in harness apps
    // altering the filter definition in this way is not recommended
    // any filter definition that defines initial state should be untouched
    delete filterToTest.defaultValue;

    // TEST CASE 2: No Default, No Options
    hs.initializeDefaults(["testDefaultValue"]);
    expect(hs.getFilter("testDefaultValue")).toEqual(null);

    // TEST CASE 3: No Default, No Options, is multiple
    filterToTest.props.multiple = true;
    hs.initializeDefaults(["testDefaultValue"]);
    expect(hs.getFilter("testDefaultValue")).toEqual([]);

    // TEST CASE 4: No Default, Options with no defaults, is multiple
    const mockOptions = [
      { key: "option1", value: "option 1" },
      { key: "option2", value: "option 2" },
      { key: "option3", value: "option 3" },
    ];
    hs.setOptionsForFilter("testDefaultValue", mockOptions);
    hs.initializeDefaults(["testDefaultValue"]);
    expect(hs.getFilter("testDefaultValue")).toEqual(["option1"]);

    // TEST CASE 5: No Default, Options with no defaults, not multiple
    filterToTest.props.multiple = false;
    hs.setOptionsForFilter("testDefaultValue", mockOptions);
    hs.initializeDefaults(["testDefaultValue"]);
    expect(hs.getFilter("testDefaultValue")).toEqual("option1");

    // TEST CASE 6: No Default, Options with defaults, not multiple
    mockOptions[1].default = true;
    mockOptions[2].default = true;
    hs.setOptionsForFilter("testDefaultValue", mockOptions);
    hs.initializeDefaults(["testDefaultValue"]);
    expect(hs.getFilter("testDefaultValue")).toEqual("option2");

    // TEST CASE 7: No Default, Options with defaults, is multiple
    filterToTest.props.multiple = true;
    hs.initializeDefaults(["testDefaultValue"]);
    expect(hs.getFilter("testDefaultValue")).toEqual(["option2", "option3"]);
  });
  it("Can Get Label for Option Key", () => {
    let hs = mockHs();
    Object.keys(page.filters()).forEach((filterKey) => {
      page.filters()[filterKey].options.forEach((option) => {
        expect(hs.getLabelForOptionKey(filterKey, option.key)).toEqual(
          option.label,
        );
      });
    });
  });
  it("Can Get Label for Option Key", () => {
    let hs = mockHs();
    Object.keys(page.filters()).forEach((filterKey) => {
      page.filters()[filterKey].options.forEach((option) => {
        hs.setFilter(filterKey, option.key);
        expect(hs.getLabelForSelectedOption(filterKey, option.key)).toEqual(
          option.label,
        );
      });
    });
  });
  it("Can Disable Option", () => {
    let hs = mockHs();
    Object.keys(page.filters()).forEach((filterKey) => {
      page.filters()[filterKey].options.forEach((option) => {
        hs.disableOptions(filterKey, [option.key]);
        let options = hs.getOptionsForFilter(filterKey);
        let disabledOption = options.filter((opt) => opt.key === option.key)[0];
        expect(disabledOption.disabled).toEqual(true);
      });
    });
  });
  it("Can Enable Option", () => {
    let hs = mockHs();
    Object.keys(page.filters()).forEach((filterKey) => {
      page.filters()[filterKey].options.forEach((option) => {
        hs.enableOptions(filterKey, [option.key]);
        let options = hs.getOptionsForFilter(filterKey);
        let disabledOption = options.filter((opt) => opt.key === option.key)[0];
        expect(disabledOption.disabled).toEqual(false);
      });
    });
  });
  it("Can Hide Option", () => {
    let hs = mockHs();
    Object.keys(page.filters()).forEach((filterKey) => {
      page.filters()[filterKey].options.forEach((option) => {
        hs.hideOptions(filterKey, [option.key]);
        let options = hs.getOptionsForFilter(filterKey);
        let hiddenOption = options.filter((opt) => opt.key === option.key)[0];
        expect(hiddenOption.hidden).toEqual(true);
      });
    });
  });
  it("Can Show Option", () => {
    let hs = mockHs();
    Object.keys(page.filters()).forEach((filterKey) => {
      page.filters()[filterKey].options.forEach((option) => {
        hs.showOptions(filterKey, [option.key]);
        let options = hs.getOptionsForFilter(filterKey);
        let shownOption = options.filter((opt) => opt.key === option.key)[0];
        expect(shownOption.hidden).toEqual(false);
      });
    });
  });

  // TODO: Test for getFilterDefault
  // TODO: Test for getFilterDefaultLabel

  it("Can Check if a filter is dirty", () => {
    let hs = mockHs();
    Object.keys(page.filters()).forEach((filterKey) => {
      expect(hs.isFilterDirty(filterKey)).toBeFalsy();
      hs.setFilter(filterKey, "Dirty");
      expect(hs.isFilterDirty(filterKey)).toBeTruthy();
    });
  });

  it("Can Check if any filters are dirty", () => {
    let hs = mockHs();
    expect(hs.areFiltersDirty()).toBeFalsy();
    Object.keys(page.filters()).forEach((filterKey) => {
      hs.setFilter(filterKey, "Dirty");
      expect(hs.areFiltersDirty()).toBeTruthy();
    });
  });

  it("Can get dirty filters", () => {
    let hs = mockHs();
    expect(hs.areFiltersDirty()).toBeFalsy();
    hs.setFilter("filter1", "filter1option2");
    expect(hs.getDirtyFilters()).toEqual(["filter1"]);
  });

  it("Can check filter validity", () => {
    let hs = mockHs();
    // filter1 is meant to be a string
    hs.setFilter("filter1", 4);
    expect(hs.isFilterValid("filter1")).toBeFalsy();
    hs.setFilter("filter1", "4");
    expect(hs.isFilterValid("filter1")).toBeTruthy();

    // filter2 is meant to be an array of numbers
    hs.setFilter("filter2", 4);
    expect(hs.isFilterValid("filter2")).toBeFalsy();
    hs.setFilter("filter2", []);
    expect(hs.isFilterValid("filter2")).toBeTruthy();
    hs.setFilter("filter2", ["a", 3, "b", 4]);
    expect(hs.isFilterValid("filter2")).toBeFalsy();
    hs.setFilter("filter2", [3, 4, 5, 5.5]);
    expect(hs.isFilterValid("filter2")).toBeTruthy();
  });
});
