/* eslint-disable no-param-reassign */
import { harsh } from '../utilities/Secure';

export default (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'bill_user',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [3, 25],
          is: {
            args: /^[a-z']+$/i,
            msg: 'First name must contain only Alphabets',
          },
        },
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [3, 25],
          is: {
            args: /^[a-z']+$/i,
            msg: 'Last name must contain only Alphabets',
          },
        },
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Email-id required',
          },
          isEmail: {
            args: true,
            msg: 'Valid email-id required',
          },
        },
        unique: {
          args: true,
          msg: 'Email address already in use!',
        },
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [11, 11],
          is: {
            args: /^[0-9]+$/i,
            msg: 'Phone number must be numbers only',
          },
        },
      },
      password: {
        type: DataTypes.TEXT,
        validate: {
          len: {
            args: [6, 150],
            msg: 'Password must be more than 5 characters',
          },
        },
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          user.password = await harsh(user.password);
        },
      },
    },
  );

  Users.associate = () => {
    // associations can be defined here
  };
  return Users;
};
