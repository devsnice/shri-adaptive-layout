const EVENT_TYPES = ["info", "critical"];

const pagination = (data, offset, limit) => {
  return data.slice(offset, offset + limit);
};

/** 
 *  Validate type
 *  it's valid if every type included in EVENT_TYPES
 */
function getTypeFilters(query) {
  const { type } = query;
  let filtersType = EVENT_TYPES;

  if (type) {
    const types = type.split(":");

    const isValidTypes = types.every(type =>
      EVENT_TYPES.includes(type)
    );

    if (!isValidTypes) {
      throw {
        status: 400,
        error: "incorrect type"
      }
    } else {
      filtersType = types;
    }
  }

  return filtersType;
}

module.exports = {
  pagination,
  getTypeFilters
};
