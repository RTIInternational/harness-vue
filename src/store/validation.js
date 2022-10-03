export default function getValidationFunctions() {
  return {
    _validateData(state) {
      return (data, idx = null) => {
        if (typeof data === "string") {
          data = state.getChartData(data);
        }
        if (!data) {
          throw String("Data array is empty");
        }
        if (!Array.isArray(data)) {
          throw String("Data is not an array");
        }
        if (idx) {
          data = state.getValues(data, idx);
        }
        return data;
      };
    },

    _validFilterKey(state) {
      return (key) => {
        if (!Object.keys(state.getFilters).includes(key)) {
          throw String(key + " is not a valid filter");
        }
      };
    },

    _validChartKey(state) {
      return (key) => {
        if (!Object.keys(state.getCharts).includes(key)) {
          throw String(key + " is not a valid chart");
        }
      };
    },

    _onlyValidNumbers(state) {
      return (data, idx = null) => {
        data = state._validateData(data, idx);
        return data.filter((d) => {
          const parsed = Number(d);
          return (
            d === parsed &&
            typeof parsed === "number" &&
            !isNaN(parsed) &&
            isFinite(parsed)
          );
        });
      };
    },
  };
}
