import TestPage2Component from "../components/TestPage2.vue";
import TestChart from "../components/TestChart.vue";
export default class TestPage2 {
  title = "Test Page 2";
  key = "TestPage2";
  pageComponent = TestPage2Component;
  pageProps = {};
  retrieveData = async function () {
    let data = {};
    for (const chartKey in this.charts()) {
      data[chartKey] = [chartKey, "success"];
    }
    return data;
  };
  filters = function () {
    return {
      filter1: {
        key: "filter1",
        label: "Filter 1",
        props: {
          test: true,
        },
        options: [
          {
            key: "default",
            label: "Filter 1 Option 1",
            default: true,
          },
          {
            key: "filter1option2",
            label: "Filter 1 Option 2",
            default: false,
          },
        ],
      },
      filter2: {
        key: "filter2",
        label: "Filter 1",
        props: {
          test: true,
        },
        options: [
          {
            key: "default",
            label: "Filter 2 Option 1",
            default: true,
          },
          {
            key: "filter2option2",
            label: "Filter 2 Option 2",
            default: false,
          },
        ],
      },
    };
  };
  charts = function () {
    return {
      testchart1: {
        key: "testchart1",
        title: "Test Chart 1",
        component: TestChart,
        props: { prop1: "prop1", prop2: "prop2" },
      },
      testchart2: {
        key: "testchart2",
        title: "Test Chart 2",
        component: TestChart,
        props: { prop1: "prop1", prop2: "prop2" },
      },
      testchart3: {
        key: "testchart3",
        title: "Test Chart 3",
        component: TestChart,
        props: { chartTitle: "Test Chart 3" },
      },
    };
  };
}
