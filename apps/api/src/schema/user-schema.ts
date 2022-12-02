import { UserType } from '@tech-notes/api-interfaces';
import { Schema } from 'mongoose';

export interface IUserSchema extends UserType {
  _id: string;
}

const userSchema = new Schema<UserType>(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        type: String,
        default: 'Employee',
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default userSchema;
