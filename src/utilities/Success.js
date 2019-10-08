/**
 * Server seccess response handler
 * @param {number} statusCode - error status code
 * @param {string} data - error message
 * @param {object} res - response object
 * @returns {object} response data object
 */
export const successResponse = (statusCode, data, res) => {
  res.status(statusCode).json({
    status: 'success',
    data, // 'there was problem saving your data',
  });
};

export default successResponse;
