const EVENT_TYPES = ["info", "critical"];

const pagination = ({
  data,
  offset,
  limit
}: {
  data: Array<any>;
  offset: number;
  limit: number;
}) => {
  return data.slice(offset, offset + limit);
};

/**
 *  Validate type
 *  it's valid if every type included in EVENT_TYPES
 */
function getTypeFilters(type: string): Array<string> {
  let filtersType = EVENT_TYPES;

  if (type) {
    const types = type.split(":");

    const isValidTypes = types.every(type => EVENT_TYPES.includes(type));

    if (!isValidTypes) {
      throw {
        status: 400,
        error: "incorrect type"
      };
    } else {
      filtersType = types;
    }
  }

  return filtersType;
}

export default {
  pagination,
  getTypeFilters
};
