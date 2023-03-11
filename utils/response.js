const APIResponse = (code, status, data) => {
  const response = {
    code: code,
    status: status,
    data: data,
  };
  return response;
};

module.exports = APIResponse;
