export default function getDefaultOption(filter, options = []) {
  // if a defaultValue is specified
  if (filter.defaultValue) {
    return filter.default;
  }

  // if no default and has options
  if (options.length) {
    const defaultOption = options.filter((option) => option.default);
    let filterDefault = null;
    if (filter.props && filter.props.multiple === true) {
      filterDefault = defaultOption.length
        ? defaultOption.reduce((acc, option) => {
            acc.push(option.key);
            return acc;
          }, [])
        : [];
    } else {
      filterDefault = defaultOption.length
        ? defaultOption[0].key
        : filter.options.length
        ? filter.options[0].key
        : null;
    }
    return filterDefault;
  }

  // if no default and has type
  if (filter.valueType) {
    if (typeof filter.valueType === "function") {
      const out = new filter.valueType();
      return out.valueOf();
    }
  }

  // if no default, no type, return array or null
  if (filter.props && filter.props.multiple === true) {
    return [];
  }
  return null;
}
