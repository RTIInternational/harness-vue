import { capitalize } from "./utils";
import getDefaultOption from "./defaultOption";

export default function getFilterHelperFunctions() {
  return {
    /**
     * Returns the value for a given filter
     * @param  {String} key a filter key
     * @memberof module:Filters
     */
    getFilter(key) {
      this._validFilterKey(key);
      return this[`get${capitalize(key)}Filter`];
    },

    /**
     * Sets a given filter's value
     *
     * @param  {String} key a filter key
     * @param  {any} payload a payload to set
     */
    setFilter(key, payload) {
      this._validFilterKey(key);
      this[`set${capitalize(key)}Filter`](payload);
    },

    /**
     * Returns the full action string for a given filter. Useful for checking in subscriptions
     *
     * @param  {String} key a filter key
     */
    getFilterActionString(key) {
      this._validFilterKey(key);
      return `set${capitalize(key)}Filter`;
    },

    /**
     * returns the props for a given filter, if they exist
     *
     * @param  {String} key a filter key
     */
    getFilterProps(key) {
      this._validFilterKey(key);
      return this.filters[key].props;
    },

    /**
     * Returns the label for a given filter
     *
     * @param  {String} key a filter key
     */
    getLabel(key) {
      this._validFilterKey(key);
      return this.filters[key] ? this.filters[key].label : null;
    },

    /**
     * Returns the options array for a given filter
     *
     * @param  {String} key a filter key
     */
    getOptionsForFilter(key) {
      this._validFilterKey(key);
      return this[`${capitalize(key)}Options`];
    },

    /**
     * Sets the options for a given filter to the array provided as payload
     *
     * @param  {String} key a filter key
     * @param  {Array} payload a payload to set
     * @param  {Boolean} setOptionToDefault=false optional variable, if true will set the filter default
     */
    setOptionsForFilter(key, payload, setDefaultOption = false) {
      this._validFilterKey(key);
      this[`set${capitalize(key)}Options`](payload);

      if (setDefaultOption) {
        this.setFilter(key, this.getFilterDefault(key));
      }
    },

    /**
     * Returns the label for a given option by key
     *
     * @param  {String} filter a filter key
     * @param  {String} key an option key for an option included in the filter
     */
    getLabelForOptionKey(filter, key) {
      this._validFilterKey(filter);
      const options = this.getOptionsForFilter(filter) || [];
      const option = options.filter((o) => {
        return o.key === key;
      })[0];
      return option ? option.label : null;
    },

    /**
     * Returns the label for a filter's selected option
     *
     * @param  {String} key a filter key
     */
    getLabelForSelectedOption(key) {
      this._validFilterKey(key);
      return this.getLabelForOptionKey(key, this.getFilter(key)) || null;
    },

    /**
     * Set disabled property to true or false on each filter
     *
     * @param  {String} filter a filter key
     * @param  {Array} optionKeysToSet an array of optionKeys
     * @param  {String} property the name of the property
     * @param  {Boolean} bool the boolean value to apply to the property
     */
    setOptionPropertyToBoolean(filter, optionKeysToSet, property, bool) {
      this._validFilterKey(filter);
      const options = this.getOptionsForFilter(filter);
      for (let i = 0; i < options.length; i++) {
        if (optionKeysToSet.includes(options[i].key)) {
          options[i][property] = bool;
        } else if (bool) {
          options[i][property] = !bool;
        }
      }
      this.setOptionsForFilter(filter, options);
    },

    /**
     * Set disabled property to false for given options
     *
     * @param  {String} filter a filter key
     * @param  {Array} optionKeys an array of optionKeys
     */
    disableOptions(filter, optionKeys) {
      this._validFilterKey(filter);
      this.setOptionPropertyToBoolean(filter, optionKeys, "disabled", true);
    },

    /**
     * Set disabled property to false for given options
     *
     * @param  {String} filter a filter key
     * @param  {Array} optionKeys an array of optionKeys
     */
    enableOptions(filter, optionKeys) {
      this._validFilterKey(filter);
      this.setOptionPropertyToBoolean(filter, optionKeys, "disabled", false);
    },

    /**
     * Set hidden property to true for given options
     *
     * @param  {String} filter a filter key
     * @param  {Array} optionKeys an array of optionKeys
     */
    hideOptions(filter, optionKeys) {
      this._validFilterKey(filter);
      this.setOptionPropertyToBoolean(filter, optionKeys, "hidden", true);
    },

    /**
     * Set hidden property to false for given options
     *
     * @param  {String} filter a filter key
     * @param  {Array} optionKeys an array of optionKeys
     */
    showOptions(filter, optionKeys) {
      this._validFilterKey(filter);
      this.setOptionPropertyToBoolean(filter, optionKeys, "hidden", false);
    },

    /**
     * Returns the default option for a given filter
     *
     * @param  {String} key a filter key
     */
    getFilterDefault(key) {
      this._validFilterKey(key);
      const filter = this.filters[key];
      const options = this.getOptionsForFilter(key);
      return getDefaultOption(filter, options);
    },

    /**
     * Returns the label for the default option for a given filter
     *
     * @param  {String} key a filter key
     */
    getFilterDefaultLabel(key) {
      this._validFilterKey(key);
      return this.getLabelForOptionKey(
        this.filters[key],
        this.getFilterDefault(key)
      );
    },

    /**
     * Returns a boolean indicating whether or not the value of this filter is equal to the value of the default. If true, the filter is no longer set to default.
     *
     * @param  {String} key a filter key
     */
    isFilterDirty(key) {
      this._validFilterKey(key);
      return (
        JSON.stringify(this.getFilterDefault(key)) !==
        JSON.stringify(this.getFilter(key))
      );
    },

    /**
     * Returns a boolean indicating whether or not any filters on the page have been set to a value other than their default
     *
     */
    areFiltersDirty() {
      return Object.keys(this.filters).reduce(
        function (final, filter) {
          if (final === false) {
            return this.isFilterDirty(filter);
          }
          return final;
        }.bind(this),
        false
      );
    },

    /**
     * Returns an array of filter keys for dirty filters
     *
     */
    getDirtyFilters() {
      return Object.keys(this.filters).filter(
        function (filter) {
          return this.isFilterDirty(filter);
        }.bind(this)
      );
    },
  };
}
