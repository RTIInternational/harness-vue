import { describe, expect, it } from "vitest";
import { mockHs } from "./store.spec.js";

describe("DV Data Helpers", () => {
  let dataArray = [
    { test: "one" },
    { test: "one" },
    { test: "two" },
    { test: "three" },
    { test: "four" },
  ];
  let dataArrayNum = [
    { test: 1 },
    { test: 1 },
    { test: 2 },
    { test: 3 },
    { test: 4 },
  ];
  let dataArrayFlat = [1, 2, 1, 3, 4, 2, 3, 4];
  let dataArrayInvalid = [
    0,
    1,
    1.01,
    true,
    false,
    NaN,
    Infinity,
    "1",
    "1.01",
    new Date(),
  ];
  let outOfOrderArrayFlat = [4, 1, 3, 1, 2, 4];
  it("Can Validate Data", () => {
    let hs = mockHs();

    // test with bad input
    let objectBad = {};
    let numberBad = 0;
    let booleanBad = true;
    expect(() => {
      hs._validateData(objectBad);
    }).toThrow();
    expect(() => {
      hs._validateData(numberBad);
    }).toThrow();
    expect(() => {
      hs._validateData(booleanBad);
    }).toThrow();

    // test with array input
    expect(hs._validateData(dataArray)).toEqual(dataArray);

    // test with string input
    hs.setChartData("testchart1", dataArray);
    expect(hs._validateData("testchart1")).toEqual(dataArray);

    // test returns flat
    hs.setChartData("testchart1", dataArray);
    expect(hs._validateData("testchart1", "test")).toEqual([
      "one",
      "one",
      "two",
      "three",
      "four",
    ]);
  });

  it("Can Validate Numbers", () => {
    let hs = mockHs();
    expect(hs._onlyValidNumbers(dataArrayInvalid)).toEqual([0, 1, 1.01]);
  });

  it("Can Get Values From Data", () => {
    let hs = mockHs();
    // test with data
    expect(hs.getValues(dataArray, "test")).toEqual([
      "one",
      "one",
      "two",
      "three",
      "four",
    ]);
    // test with string
    hs.setChartData("testchart1", dataArray);
    expect(hs.getValues("testchart1", "test")).toEqual([
      "one",
      "one",
      "two",
      "three",
      "four",
    ]);
  });

  it("Can Get Distinct Values From Data", () => {
    let hs = mockHs();
    // test strings
    expect(hs.getDistinctValues(dataArray, "test")).toEqual([
      "four",
      "one",
      "three",
      "two",
    ]);

    // test flat
    expect(hs.getDistinctValues(dataArrayFlat)).toEqual([1, 2, 3, 4]);
    // test nums
    expect(hs.getDistinctValues(dataArrayNum, "test")).toEqual([1, 2, 3, 4]);
    // test map
    const map = ["one", "two", "three", "four"];
    expect(hs.getDistinctValues(dataArray, "test", map)).toEqual(map);
    // test subset map
    let bigMap = [...map, "five", "six"];
    expect(hs.getDistinctValues(dataArray, "test", bigMap)).toEqual(map);
  });

  it("Can Get Distinct Unsorted Values From Data", () => {
    let hs = mockHs();
    // test strings
    expect(hs.getDistinctValues(dataArray, "test", null, false)).toEqual([
      "one",
      "two",
      "three",
      "four",
    ]);

    // test flat
    expect(hs.getDistinctValues(dataArrayFlat)).toEqual([1, 2, 3, 4]);
    // test out of order flat
    expect(hs.getDistinctValues(outOfOrderArrayFlat)).toEqual([4, 1, 3, 2]);
    // test nums
    expect(hs.getDistinctValues(dataArrayNum, "test")).toEqual([1, 2, 3, 4]);
  });

  it("Can Apply Filter To Column", () => {
    let hs = mockHs();

    // test with multiple eligible rows
    hs.setFilter("filter1", "one");
    expect(hs.applyFilterToColumn("filter1", "test", dataArray)).toEqual([
      { test: "one" },
      { test: "one" },
    ]);

    // test with single eligible row
    hs.setFilter("filter1", "two");
    expect(hs.applyFilterToColumn("filter1", "test", dataArray)).toEqual([
      { test: "two" },
    ]);

    // test with all key
    hs.setFilter("filter1", "all");
    expect(hs.applyFilterToColumn("filter1", "test", dataArray, "all")).toEqual(
      dataArray,
    );
  });

  it("Can Get Min", () => {
    let hs = mockHs();
    // test with arrays
    // test with flat data array
    expect(hs.getMin(dataArrayFlat)).toEqual(1);
    // test with column
    expect(hs.getMin(dataArrayNum, "test")).toEqual(1);

    // test with strings
    hs.setChartData("testchart1", dataArrayFlat);
    expect(hs.getMin("testchart1")).toEqual(1);
    hs.setChartData("testchart1", dataArrayNum);
    expect(hs.getMin("testchart1", "test")).toEqual(1);
  });

  it("Can Get Max", () => {
    let hs = mockHs();
    // test with arrays
    // test with flat data array
    expect(hs.getMax(dataArrayFlat)).toEqual(4);
    // test with column
    expect(hs.getMax(dataArrayNum, "test")).toEqual(4);

    // test with strings
    hs.setChartData("testchart1", dataArrayFlat);
    expect(hs.getMax("testchart1")).toEqual(4);
    hs.setChartData("testchart1", dataArrayNum);
    expect(hs.getMax("testchart1", "test")).toEqual(4);
  });

  it("Can Get Median", () => {
    let hs = mockHs();
    let median3 = [1, 2, 3, 4, 5];
    let median3Unsorted = [2, 4, 3, 1, 5];
    let median3dot5 = [1, 2, 3, 4, 5, 6];
    let median3dot5Unsorted = [2, 4, 6, 1, 3, 5];
    let median6 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    // test with sorted
    expect(hs.getMedian(median3)).toEqual(3);
    hs.setChartData("testchart1", median3);
    expect(hs.getMedian("testchart1")).toEqual(3);

    expect(hs.getMedian(median3dot5)).toEqual(3.5);
    hs.setChartData("testchart1", median3dot5);
    expect(hs.getMedian("testchart1")).toEqual(3.5);

    expect(hs.getMedian(median6)).toEqual(6);
    hs.setChartData("testchart1", median6);
    expect(hs.getMedian("testchart1")).toEqual(6);

    // test with unsorted
    expect(hs.getMedian(median3Unsorted)).toEqual(3);
    expect(hs.getMedian(median3dot5Unsorted)).toEqual(3.5);
  });

  it("Can Get Sum", () => {
    let hs = mockHs();
    expect(hs.getSum(dataArrayFlat)).toEqual(20);
    hs.setChartData("testchart1", dataArrayNum);
    expect(hs.getSum("testchart1", "test")).toEqual(11);
  });

  it("Can Get Mean", () => {
    let hs = mockHs();
    let mean4 = [2, 6, 4];
    expect(hs.getMean(mean4)).toEqual(4);
    hs.setChartData("testchart1", mean4);
    expect(hs.getMean(mean4)).toEqual(4);
  });

  it("Can Get Geometric Mean", () => {
    let hs = mockHs();
    let geoMean41 = [2, 6, 4];
    expect(hs.getGeometricMean(geoMean41)).toEqual(41.42135623730952);
    hs.setChartData("testchart1", geoMean41);
    expect(hs.getGeometricMean(geoMean41)).toEqual(41.42135623730952);
  });

  it("Can Get Quartiles", () => {
    let hs = mockHs();
    let mockOdd = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    let mockOddObjects = [
      { field1: 12, field2: 1 },
      { field1: 12, field2: 2 },
      { field1: 12, field2: 3 },
      { field1: 12, field2: 4 },
      { field1: 12, field2: 5 },
      { field1: 12, field2: 6 },
      { field1: 12, field2: 7 },
      { field1: 12, field2: 8 },
      { field1: 12, field2: 9 },
      { field1: 12, field2: 10 },
      { field1: 12, field2: 11 },
    ];
    let mockEven = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let mockEvenObjects = [
      { field1: 12, field2: 1 },
      { field1: 12, field2: 2 },
      { field1: 12, field2: 3 },
      { field1: 12, field2: 4 },
      { field1: 12, field2: 5 },
      { field1: 12, field2: 6 },
      { field1: 12, field2: 7 },
      { field1: 12, field2: 8 },
      { field1: 12, field2: 9 },
      { field1: 12, field2: 10 },
    ];
    expect(hs.getQuartiles(mockOdd)).toEqual({
      minimum: 1,
      lowerQuartile: 3,
      median: 6,
      upperQuartile: 9,
      maximum: 11,
      IQR: 6,
    });
    expect(hs.getQuartiles(mockOddObjects, "field2")).toEqual({
      minimum: 1,
      lowerQuartile: 3,
      median: 6,
      upperQuartile: 9,
      maximum: 11,
      IQR: 6,
    });
    expect(hs.getQuartiles(mockEven)).toEqual({
      minimum: 1,
      lowerQuartile: 3,
      median: 5.5,
      upperQuartile: 8,
      maximum: 10,
      IQR: 5,
    });
    expect(hs.getQuartiles(mockEvenObjects, "field2")).toEqual({
      minimum: 1,
      lowerQuartile: 3,
      median: 5.5,
      upperQuartile: 8,
      maximum: 10,
      IQR: 5,
    });
  });

  it("Can Get Outliers", () => {
    let hs = mockHs();
    let mockSingleRowLowerThanGreaterThan = [
      1, 2, 39, 41, 43, 45, 49, 52, 55, 57, 59, 96, 98,
    ];
    let mockSingleRowLowerThanGreaterThanObjects = [
      { field1: 12, field2: 1 },
      { field1: 12, field2: 2 },
      { field1: 12, field2: 39 },
      { field1: 12, field2: 41 },
      { field1: 12, field2: 43 },
      { field1: 12, field2: 45 },
      { field1: 12, field2: 45 },
      { field1: 12, field2: 52 },
      { field1: 12, field2: 55 },
      { field1: 12, field2: 57 },
      { field1: 12, field2: 59 },
      { field1: 12, field2: 96 },
      { field1: 12, field2: 98 },
    ];
    let mockSingleRowEqualTo = [1, 7, 39, 41, 43, 45, 49, 52, 55, 57, 59];
    let mockSingleRowEqualToObjects = [
      { field1: 12, field2: 1 },
      { field1: 12, field2: 7 },
      { field1: 12, field2: 39 },
      { field1: 12, field2: 41 },
      { field1: 12, field2: 43 },
      { field1: 12, field2: 45 },
      { field1: 12, field2: 45 },
      { field1: 12, field2: 52 },
      { field1: 12, field2: 55 },
      { field1: 12, field2: 57 },
      { field1: 12, field2: 59 },
    ];
    expect(hs.getOutliers(mockSingleRowLowerThanGreaterThan)).toEqual([
      1, 2, 96, 98,
    ]);
    expect(
      hs.getOutliers(mockSingleRowLowerThanGreaterThanObjects, "field2"),
    ).toEqual([
      { field1: 12, field2: 1 },
      { field1: 12, field2: 2 },
      { field1: 12, field2: 96 },
      { field1: 12, field2: 98 },
    ]);
    expect(hs.getOutliers(mockSingleRowEqualTo)).toEqual([1, 7]);
    expect(hs.getOutliers(mockSingleRowEqualToObjects, "field2")).toEqual([
      { field1: 12, field2: 1 },
      { field1: 12, field2: 7 },
    ]);
  });

  it("Can Remove Outliers", () => {
    let hs = mockHs();
    let mockSingleRowLowerThanGreaterThan = [
      1, 2, 39, 41, 43, 45, 49, 52, 55, 57, 59, 96, 98,
    ];
    let mockSingleRowLowerThanGreaterThanObjects = [
      { field1: 12, field2: 1 },
      { field1: 12, field2: 2 },
      { field1: 12, field2: 39 },
      { field1: 12, field2: 41 },
      { field1: 12, field2: 43 },
      { field1: 12, field2: 45 },
      { field1: 12, field2: 45 },
      { field1: 12, field2: 52 },
      { field1: 12, field2: 55 },
      { field1: 12, field2: 57 },
      { field1: 12, field2: 59 },
      { field1: 12, field2: 96 },
      { field1: 12, field2: 98 },
    ];
    let mockSingleRowEqualTo = [1, 7, 39, 41, 43, 45, 49, 52, 55, 57, 59];
    let mockSingleRowEqualToObjects = [
      { field1: 12, field2: 1 },
      { field1: 12, field2: 7 },
      { field1: 12, field2: 39 },
      { field1: 12, field2: 41 },
      { field1: 12, field2: 43 },
      { field1: 12, field2: 45 },
      { field1: 12, field2: 45 },
      { field1: 12, field2: 52 },
      { field1: 12, field2: 55 },
      { field1: 12, field2: 57 },
      { field1: 12, field2: 59 },
    ];
    expect(hs.removeOutliers(mockSingleRowLowerThanGreaterThan)).toEqual([
      39, 41, 43, 45, 49, 52, 55, 57, 59,
    ]);
    expect(
      hs.removeOutliers(mockSingleRowLowerThanGreaterThanObjects, "field2"),
    ).toEqual([
      { field1: 12, field2: 39 },
      { field1: 12, field2: 41 },
      { field1: 12, field2: 43 },
      { field1: 12, field2: 45 },
      { field1: 12, field2: 45 },
      { field1: 12, field2: 52 },
      { field1: 12, field2: 55 },
      { field1: 12, field2: 57 },
      { field1: 12, field2: 59 },
    ]);
    expect(hs.removeOutliers(mockSingleRowEqualTo)).toEqual([
      39, 41, 43, 45, 49, 52, 55, 57, 59,
    ]);
    expect(hs.removeOutliers(mockSingleRowEqualToObjects, "field2")).toEqual([
      { field1: 12, field2: 39 },
      { field1: 12, field2: 41 },
      { field1: 12, field2: 43 },
      { field1: 12, field2: 45 },
      { field1: 12, field2: 45 },
      { field1: 12, field2: 52 },
      { field1: 12, field2: 55 },
      { field1: 12, field2: 57 },
      { field1: 12, field2: 59 },
    ]);
  });
});
