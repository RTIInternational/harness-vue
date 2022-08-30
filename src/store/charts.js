import { capitalize } from "./utils";
import { saveAs } from "file-saver";

export default function getChartHelperFunctions() {
  return {
    /**
     * Returns the chart object for a given key
     *
     * @param  {String} key a chart key
     */
    getChartObject(key) {
      this._validChartKey(key);
      return this.charts[key];
    },

    /**
     * Returns data for a given chart
     *
     * @param  {String} key a chart key
     */
    getChartData(key) {
      this._validChartKey(key);
      return this[`get${capitalize(key)}ChartData`];
    },

    /**
     * Sets data for a given chart
     *
     * @param  {String} key a chart key
     */
    setChartData(key, payload) {
      this._validChartKey(key);
      this[`set${capitalize(key)}ChartData`](payload);
    },

    /**
     * Returns the full action string for a given chart. Useful for checking in subscriptions
     *
     * @param  {String} key a chart key
     */
    getChartDataActionString(key) {
      this._validChartKey(key);
      return `set${capitalize(key)}ChartData`;
    },

    /**
     * Returns the props for a given chart if they exist
     *
     * @param  {String} key a chart key
     */
    getChartProps(key) {
      this._validChartKey(key);
      return this.charts[key].props;
    },

    /**
     * Validates that data is formatted correctly for the downloadCSV function (an array of objects)
     *
     * @param  {any} data the data to be validated. If null, it will not validate (for lifecyle)
     * @param  {} key the key for this data's chart
     */
    validateChartData(data, key) {
      this._validChartKey(key);
      if (data) {
        if (!Array.isArray(data)) {
          let msg = "The processed data for " + key + " is not an array.";
          if (!this.getChartProps(key).tableAdapter) {
            msg +=
              " Please add a tableAdapter function to your chart that processes it for tabular representation.";
          }
          throw String(msg);
        }
        if (data.length < 1) {
          throw String("The processed data for " + key + " has no content.");
        }
        data.forEach((row) => {
          if (typeof row !== "object") {
            let msg =
              "The processed data for " +
              key +
              " contains non-object elements.";
            if (!this.getChartProps(key).tableAdapter) {
              msg +=
                " Please add a tableAdapter function to your chart that processes it for tabular representation.";
            }
            throw String(msg);
          }
        });
      }
      return data;
    },

    /**
     * Generates a csv of a given table, optionally formatted through a chart's tableAdapter prop
     *
     * @param  {String} key a chart key
     * @param  {String} returnFormat format to generate the CSV in
     */
    generateCSV(key, returnFormat = "string") {
      this._validChartKey(key);
      try {
        const props = this.getChartProps(key);
        let data = this.getChartData(key);
        if (props.tableAdapter) {
          data = props.tableAdapter(this.charts[key], this.filters, data, this);
        }
        data = this.validateChartData(data, key);
        const keys = Object.keys(data[0]);
        const header = keys;

        const rows = [];
        data.forEach((datum) => {
          const row = [];
          keys.forEach((key) => {
            row.push('"' + String(datum[key]) + '"');
          });
          rows.push(row);
        });
        let csv = header.join(",");
        rows.forEach((row) => {
          csv += "\n";
          csv += row.join(",");
        });
        if (returnFormat === "string") {
          return csv;
        } else if (returnFormat === "blob") {
          return new Blob([csv], { type: "data:text/csv;charset=utf-8" });
        }
      } catch (error) {
        throw String(
          "There was an error generating a CSV for this given data: " +
            String(error)
        );
      }
    },

    /**
     * Downloads a csv of a given table, optionally formatted through a chart's tableAdapter prop.
     * If a chartTitle prop exists, the csv will be generated using that as the file name
     *
     * @param  {String} key a chart key
     */
    downloadCSV(key) {
      this._validChartKey(key);
      try {
        const blob = this.generateCSV(key, "blob");
        saveAs(blob, (this.getChartProps(key).chartTitle || key) + ".csv");
      } catch (error) {
        throw String(
          "There was an error downloading a CSV for this given data: " +
            String(error)
        );
      }
    },
  };
}
