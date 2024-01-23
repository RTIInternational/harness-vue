export default function getDefaultOption(filter, options = []) {
  // if a defaultValue is specified
  if (filter.defaultValue) {
    return filter.defaultValue;
  }

  // if no defaultValue is specified and filter has options
  if (options.length) {
    // get options where default is true
    const defaultOptions = options.filter((option) => option.default);

    // return default(s) if they exist (as array if props.multiple is true)
    if (defaultOptions.length > 0) {
      if (filter?.props?.multiple === true) {
        return defaultOptions.map((option) => option.key);
      } else {
        return defaultOptions[0].key;
      }
    }
    // return first option if no default(s) detected
    else {
      if (filter?.props?.multiple === true) {
        return [options[0].key];
      } else {
        return options[0].key;
      }
    }
  }

  // if no defaultValue is specified and no options exist
  return filter?.props?.multiple ? [] : null;
}
