import Joi from '@hapi/joi';

import { serverError } from '../utilities/Error';

const schema = Joi.object().keys({
  firstName: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .min(2)
    .max(30)
    .required(),
  lastName: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .min(2)
    .max(30)
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{5,30}$/)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),
  phone: Joi.string()
    .regex(/^(0)[0-9]{9,10}$/)
    .required(),
});

export const validateUserData = (req, res, next) => {
  const result = Joi.validate(req.body, schema);

  if (result.error) {
    serverError(500, result.error.details[0].message, res);
  } else {
    next();
  }
};

export default validateUserData;
