import { describe, expect, it } from "vitest";
import { mockHs } from "./store.spec.js";

describe("DV Lifecycle functions", () => {
  it("Can Load Data", async () => {
    let hs = mockHs();
    hs.loadData().then(() => {
      Object.keys(hs.charts).forEach((chartKey) => {
        expect(hs.getChartData(chartKey)).toEqual([chartKey, "success"]);
      });
    });
  });
  it("Can Clear Data", async () => {
    let hs = mockHs();
    hs.clearData();
    Object.keys(hs.charts).forEach((chartKey) => {
      expect(hs.getChartData(chartKey)).toBeNull();
    });
  });
  it("Can Initialize Defaults", async () => {
    let hs = mockHs();
    hs.initializeDefaults();
    expect(hs.areFiltersDirty()).toBeFalsy();
  });
  // TODO: Add tests for defaults-related functionality
  it("Can Initialize Defaults For All Filters", async () => {
    let hs = mockHs();
    hs.setFilter("filter1", "filter1option2");
    hs.setFilter("filter2", "filter2option2");
    hs.initializeDefaults();
    expect(hs.isFilterDirty("filter1")).toBeFalsy();
    expect(hs.isFilterDirty("filter2")).toBeFalsy();
  });
  it("Can Initialize Defaults For Selected Filters", async () => {
    let hs = mockHs();
    hs.setFilter("filter1", "filter1option2");
    hs.setFilter("filter2", "filter2option2");
    hs.initializeDefaults(["filter1"]);
    expect(hs.isFilterDirty("filter1")).toBeFalsy();
    expect(hs.isFilterDirty("filter2")).toBeTruthy();
  });

  it("Can Get and Set Request Cache", async () => {
    let hs = mockHs();
    hs.setRequestCache("Testing");
    expect(hs.getRequestCache).toEqual("Testing");
  });
});
