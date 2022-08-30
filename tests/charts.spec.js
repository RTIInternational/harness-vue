import { describe, expect, it } from "vitest";
import { mockHs, page } from "./store.spec.js";
import { capitalize } from "../src/store/utils";

describe("DV Chart functions", () => {
  it("Can Validate Chart Keys", () => {
    let hs = mockHs();
    expect(() => {
      hs._validChartKey("testchart1");
    }).not.toThrow();
    expect(() => {
      hs._validChartKey("not a chart key");
    }).toThrow();
  });
  it("Can Get Chart Object", () => {
    let hs = mockHs();
    Object.keys(page.charts()).forEach((chartKey) => {
      expect(hs.getChartObject(chartKey)).toEqual(hs.charts[chartKey]);
    });
  });
  it("Can Get Chart Data", () => {
    let hs = mockHs();
    Object.keys(page.charts()).forEach((chartKey) => {
      expect(hs.getChartData(chartKey)).toEqual(null);
    });
  });
  it("Can Set Chart Data", () => {
    let hs = mockHs();
    Object.keys(page.charts()).forEach((chartKey) => {
      hs.setChartData(chartKey, "Testing set chart data");
      expect(hs.getChartData(chartKey)).toEqual("Testing set chart data");
    });
  });
  it("Can Get Chart Action String", () => {
    let hs = mockHs();
    Object.keys(page.charts()).forEach((chartKey) => {
      let expected = `set${capitalize(chartKey)}ChartData`;
      expect(hs.getChartDataActionString(chartKey)).toEqual(expected);
    });
  });
  it("Can Get Chart Props", () => {
    let hs = mockHs();
    Object.keys(page.charts()).forEach((chartKey) => {
      expect(hs.getChartProps(chartKey)).toEqual(page.charts()[chartKey].props);
    });
  });
  it("Can Generate CSV", async () => {
    let hs = mockHs();
    let testChart3Data = [{ testchart3: "success" }];
    hs.setChartData("testchart3", testChart3Data);
    expect(hs.getChartProps("testchart3").chartTitle).toEqual("Test Chart 3");
    // eslint-disable-next-line no-useless-escape
    expect(hs.generateCSV("testchart3")).toEqual('testchart3\n"success"');
  });
  // TODO: Test for downloadCsv
});
