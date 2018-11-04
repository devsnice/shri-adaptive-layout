const EVENT_TYPES = ["info", "critical"];

const pagination = ({ data, offset, limit }: { data: any[]; offset: number; limit: number }) => {
  return data.slice(offset, offset + limit);
};

/**
 *  Validate type
 *  it's valid if every type included in EVENT_TYPES
 */
function getTypeFilters(type: string): string[] {
  let filtersType = EVENT_TYPES;

  if (type) {
    const types = type.split(":");

    const isValidTypes = types.every(currentType => EVENT_TYPES.includes(currentType));

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
