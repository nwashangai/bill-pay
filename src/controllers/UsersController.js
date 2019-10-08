/* eslint-disable no-tabs */
// @ts-nocheck
import Models from '../models';
import { confirmEmailToken } from '../utilities/confirmEmailToken';
import { sendEmailConfirmation } from '../utilities/ForwardEmails';
import { serverError } from '../utilities/Error';
import { successResponse } from '../utilities/Success';

const { bill_user: Users } = Models;
/**
 * Class representing the User controller
 * @class UserController
 * @description User controller
 */
class UserController {
  /**
	 * Signup User
	 * @param {object} req - Request object
	 * @param {object} res - Request object
	 * @returns {object} Response object
	 */
  static async signup(req, res) {
    const {
      firstName, lastName, email, password, phone,
    } = req.body;

    try {
      const userCreated = await Users.create({
        password,
        email,
        firstName,
        lastName,
        phone,
      });
      if (userCreated) {
        const { dataValues } = userCreated;
        const token = confirmEmailToken({ userID: dataValues.id });
        await sendEmailConfirmation(token, firstName, email);
      }
      const data = {
        message: `email has been sent to ${email}`,
      };
      successResponse(201, data, res);
    } catch (error) {
      serverError(500, error.message, res);
    }
  }

  /**
	 * Signup User
	 * @param {object} req - Request object
	 * @param {object} res - Request object
	 * @returns {object} Response object
	 */
  static async verifyUserSignup(req, res) {
    try {
      const updated = await Users.update({ isVerified: true }, { where: { id: req.userID } });

      if (updated[0] < 1) {
        throw new Error('No record was updated');
      }
      const data = {
        message: 'verification successful',
      };
      successResponse(200, data, res);
    } catch (error) {
      serverError(500, error.message, res);
    }
  }
}

export default UserController;
