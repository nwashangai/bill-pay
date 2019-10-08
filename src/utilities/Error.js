/**
 * Server error handler
 * @param {number} statusCode - error status code
 * @param {string} message - error message
 * @param {object} res - response object
 * @returns {object} response data object
 */
export const serverError = (statusCode, message, res) => {
  res.status(statusCode).json({
    status: 'error',
    message, // 'there was problem saving your data',
  });
};

export default serverError;
