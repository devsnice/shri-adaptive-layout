const pagination = (data, offset, limit) => {
  return data.slice(offset, offset + limit);
};

module.exports = pagination;
