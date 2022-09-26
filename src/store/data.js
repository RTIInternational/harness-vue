export default function getDataHelperFunctions() {
  return {
    /**
     * Returns all values in a given data key/attribute, unsorted
     * @param  {Array/String} data an array of data arrays, or a string representing a chart data key
     * @param  {} idx the key to use for either the object attribute or array column you are trying to get values for
     */
    getValues(data, idx) {
      data = this._validateData(data);
      return data.reduce((acc, datum) => {
        acc.push(datum[idx]);
        return acc;
      }, []);
    },

    /**
     * Returns an array of distinct values from an array of arrays or objects by index. If values are strings or numbers they will be sorted, and if an optional array of values is provided as a map it will be used to sort.
     *
     * @param  {Array/String} data an array of data arrays, or a string representing a chart data key
     * @param  {String/Number} idx=null the key to use for either the object attribute or array column you are trying to get distinct values for
     * @param  {Array} map=null an array of values to use as an ordering map in sort
     */
    getDistinctValues(data, idx = null, map = null) {
      data = this._validateData(data);
      // extract distinct values
      if (idx) {
        data = this.getValues(data, idx);
      }
      return data
        .reduce((acc, datum) => {
          if (!acc.includes(datum)) {
            acc.push(datum);
          }
          return acc;
        }, [])
        .sort((a, b) => {
          if (map) {
            // sort by map
            return map.indexOf(a) - map.indexOf(b);
          } else if (typeof a === "string" && typeof b === "string") {
            // sort strings
            return a.localeCompare(b, "en", { sensitivity: "base" });
          }
        });
    },
    /**
     * Applies the value(s) of a harness filter to a column in a given set of data and returns the filtered result
     * @param  {String} filter a key representing a harness filter
     * @param  {String/Number} column the column/attribute in the data to apply the filter to
     * @param  {Array/String} data an array of data arrays, or a string representing a chart data key
     * @param  {String} allKey=null a string representing a potential value for "all". If this is variable is present in the filter, the filter is not applied
     */
    applyFilterToColumn(filter, column, data, allKey = null) {
      // if data is string, get chart data
      data = this._validateData(data);
      const filterValue = this.getFilter(filter);
      if (!filterValue) {
        throw String("Filter value is empty");
      }

      return data.filter((datum) => {
        // handle 'multiple' filters where value is an array
        if (Array.isArray(filterValue)) {
          const match = filterValue.includes(datum[column]);
          if (allKey) {
            return filterValue.includes(allKey) || match;
          }
          return match;
        }
        // handle normal filters with a single value
        const match = filterValue === datum[column];
        if (allKey) {
          return filterValue === allKey || match;
        }
        return match;
      });
    },
    /**
     * Gets the minimum value from an array of data. If an index is supplied, gets the minimum for that index/attribute in the data. Only includes valid numbers in calculations.
     * @param  {Array/String} data an array of data/data arrays, or a string representing a chart data key
     * @param  {String/Number} idx=null the optional index/attribute in the data to apply the filter to
     */
    getMin(data, idx = null) {
      data = this._onlyValidNumbers(data, idx);
      return Math.min(...data);
    },

    /**
     * Gets the maximum value from an array of data. If an index is supplied, gets the maximum for that index/attribute in the data.  Only includes valid numbers in calculations.
     * @param  {Array/String} data an array of data/data arrays, or a string representing a chart data key
     * @param  {String/Number} idx=null the optional index/attribute in the data to apply the filter to
     */
    getMax(data, idx = null) {
      data = this._onlyValidNumbers(data, idx);
      return Math.max(...data);
    },

    /**
     * Gets the median of an array of data
     * @param  {Array/String} data an array of data/data arrays, or a string representing a chart data key.  Only includes valid numbers in calculations.
     * @param  {String/Number} idx=null the optional index/attribute in the data to apply the filter to
     */
    getMedian(data, idx = null) {
      data = this._onlyValidNumbers(data, idx).sort((a, b) => a - b);
      const midpoint = Math.floor(data.length / 2);
      return data.length % 2 !== 0
        ? data[midpoint]
        : (data[midpoint - 1] + data[midpoint]) / 2;
    },

    /**
     * Gets the sum for an array of data.  Only includes valid numbers in calculations.
     * @param  {Array/String} data an array of data/data arrays, or a string representing a chart data key
     * @param  {String/Number} idx=null the optional index/attribute in the data to apply the filter to
     */
    getSum(data, idx = null) {
      data = this._onlyValidNumbers(data, idx);
      return data.reduce((acc, datum) => acc + datum);
    },

    /**
     * Gets the mean for an array of data.  Only includes valid numbers in calculations.
     * @param  {Array/String} data an array of data/data arrays, or a string representing a chart data key
     * @param  {String/Number} idx=null the optional index/attribute in the data to apply the filter to
     */
    getMean(data, idx = null) {
      data = this._onlyValidNumbers(data, idx);
      return this.getSum(data) / data.length;
    },

    /**
     * Gets the geometric mean for an array of data.  Only includes valid numbers in calculations.
     * @param  {Array/String} data an array of data/data arrays, or a string representing a chart data key
     * @param  {String/Number} idx=null the optional index/attribute in the data to apply the filter to
     */
    getGeometricMean(data, idx = null) {
      data = this._onlyValidNumbers(data, idx);
      const changePcts = [];
      data.forEach((datum, datumIdx) => {
        if (datumIdx + 1 < data.length) {
          const datum1val = parseInt(datum) || 0;
          const datum2val = parseInt(data[datumIdx + 1]) || 0;
          if (datum1val && datum2val) {
            // ignore zeroes
            if (datum1val === datum2val) {
              changePcts.push(1);
            } else {
              const change = datum2val - datum1val;
              const pctChange = 1 + (change * 100) / datum1val / 100; // convert change percent to decimal relative to 1. ie 3% becomes 1.03, -3% becomes 0.97
              changePcts.push(pctChange);
            }
          }
        }
      });
      let geoMean = changePcts.reduce((acc, pct) => acc * pct, 1); // multiply all change percents, starting with a baseline of 1
      geoMean = Math.pow(geoMean, 1 / changePcts.length) - 1; // get nth root of product n=length
      geoMean = geoMean * 100; // unpack back to a percent
      return geoMean;
    },

    /**
     * Gets quartiles for an array of data. Returns in format {minimum, lowerQuartile, median, upperQuartile, maximum, IQR}.  Only includes valid numbers in calculations.
     * @param  {Array/String} data an array of data/data arrays, or a string representing a chart data key
     * @param  {String/Number} idx=null the optional index/attribute in the data to apply the filter to
     */
    getQuartiles(data, idx = null) {
      data = this._onlyValidNumbers(data, idx).sort((a, b) => a - b);
      const intervals = [0.25, 0.5, 0.75];
      const quartileIntervals = intervals.reduce((final, interval) => {
        const position = data.length * interval;
        const floor = Math.floor(position);

        if (floor === position) {
          final.push((data[floor - 1] + data[floor]) / 2);
        } else {
          final.push(data[floor]);
        }
        return final;
      }, []);
      return {
        minimum: this.getMin(data),
        lowerQuartile: quartileIntervals[0],
        median: quartileIntervals[1],
        upperQuartile: quartileIntervals[2],
        maximum: this.getMax(data),
        IQR: quartileIntervals[2] - quartileIntervals[0],
      };
    },

    /**
     * Returns truncated dataset with outliers for a given array of data. Outliers are identified as any values that equal or lower than the lower quartile - (1.5 x IQR) or
     * equal to or higher than the upper quartile + (1.5 x IQR).
     * @param  {Array/String} data an array of data/data arrays, or a string representing a chart data key
     * @param  {String/Number} idx=null the optional index/attribute in the data to apply the filter to
     */
    getOutliers(data, idx = null) {
      if (idx) {
        data = this._validateData(data).sort((a, b) => a[idx] - b[idx]);
        data = data.filter((datum) => {
          const parsed = Number(datum[idx]);
          return (
            datum[idx] === parsed &&
            typeof parsed === "number" &&
            !isNaN(parsed) &&
            isFinite(parsed)
          );
        });
      } else {
        data = this._onlyValidNumbers(data, idx).sort((a, b) => a - b);
      }
      const quartiles = this.getQuartiles(data, idx);
      const lowerBound = quartiles["lowerQuartile"] - 1.5 * quartiles["IQR"];
      const upperBound = quartiles["upperQuartile"] + 1.5 * quartiles["IQR"];
      if (idx) {
        return data.filter(
          (datum) => datum[idx] <= lowerBound || datum[idx] >= upperBound
        );
      } else {
        return data.filter(
          (datum) => datum <= lowerBound || datum >= upperBound
        );
      }
    },

    /**
     * Returns truncated dataset minus outliers for a given array of data. Outliers are identified as any values that equal or lower than the lower quartile - (1.5 x IQR) or
     * equal to or higher than the upper quartile + (1.5 x IQR).
     * @param  {Array/String} data an array of data/data arrays, or a string representing a chart data key
     * @param  {String/Number} idx=null the optional index/attribute in the data to apply the filter to
     */
    removeOutliers(data, idx = null) {
      if (idx) {
        data = this._validateData(data).sort((a, b) => a[idx] - b[idx]);
        data = data.filter((datum) => {
          const parsed = Number(datum[idx]);
          return (
            datum[idx] === parsed &&
            typeof parsed === "number" &&
            !isNaN(parsed) &&
            isFinite(parsed)
          );
        });
      } else {
        data = this._onlyValidNumbers(data, idx).sort((a, b) => a - b);
      }
      const quartiles = this.getQuartiles(data, idx);
      const lowerBound = quartiles["lowerQuartile"] - 1.5 * quartiles["IQR"];
      const upperBound = quartiles["upperQuartile"] + 1.5 * quartiles["IQR"];
      if (idx) {
        return data.filter(
          (datum) => datum[idx] > lowerBound && datum[idx] < upperBound
        );
      } else {
        return data.filter((datum) => datum > lowerBound && datum < upperBound);
      }
    },
  };
}
