const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

const getPagination = (query) => {
  const limit = query.limit ? parseInt(query.limit) : DEFAULT_LIMIT;
  const page = query.page ? parseInt(query.page) : DEFAULT_PAGE;
  const skip = (page - 1) * limit;

  return { skip, limit };
};

module.exports = getPagination;
