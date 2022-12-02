import { model } from 'mongoose';

import userSchema, { IUserSchema } from '../schema/user-schema';

const UserModel = model<IUserSchema>('User', userSchema);
export default UserModel;
