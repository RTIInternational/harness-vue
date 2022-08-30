export default function getValidationFunctions() {
  return {
    _validateData(data, idx = null) {
      if (typeof data === "string") {
        data = this.getChartData(data);
      }
      if (!data) {
        throw String("Data array is empty");
      }
      if (!Array.isArray(data)) {
        throw String("Data is not an array");
      }
      if (idx) {
        data = this.getValues(data, idx);
      }
      return data;
    },
    _validFilterKey(key) {
      if (!this.filters.hasOwnProperty(key)) {
        throw String(key + " is not a valid filter");
      }
    },

    _validChartKey(key) {
      if (!this.charts.hasOwnProperty(key)) {
        throw String(key + " is not a valid chart");
      }
    },

    _onlyValidNumbers(data, idx = null) {
      data = this._validateData(data, idx);
      return data.filter((d) => {
        const parsed = Number(d);
        return (
          d === parsed &&
          typeof parsed === "number" &&
          !isNaN(parsed) &&
          isFinite(parsed)
        );
      });
    },
  };
}
