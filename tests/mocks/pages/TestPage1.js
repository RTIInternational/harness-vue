import TestPage1Component from "../components/TestPage1.vue";
import TestChart from "../components/TestChart.vue";
export default class TestPage1 {
  title = "Test Page 1";
  key = "TestPage1";
  pageComponent = TestPage1Component;
  pageProps = {};
  loadData = async function () {
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
        valueType: "string",
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
        label: "Filter 2",
        valueType: "array",
        valueValidator: (state, value) => {
          let ret = true;
          value.forEach((v) => {
            if (typeof v !== "number") {
              ret = false;
            }
          });
          return ret;
        },
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
        props: { chartTitle: "Test Chart 2" },
      },
      testchart3: {
        key: "testchart3",
        title: "Test Chart 3",
        component: TestChart,
        props: { chartTitle: "Test Chart 3" },
      },
    };
  };

  extendGetters = () => {
    return {
      extendedGetter(state) {
        return state || false;
      },
    };
  };
  extendActions = () => {
    return {
      extendedAction(payload) {
        this.setFilter("filter1", payload);
      },
    };
  };
  extendState = () => {
    return {
      arbitrary: "test",
    };
  };
  //eslint-disable-next-line
  extendSubscriptions = (name, args, store, pageDefinition, hook) => {
    // console.log(name, args, store, pageDefinition, hook);
  };
}
