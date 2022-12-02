import { UserType } from '@tech-notes/api-interfaces';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import asyncHandler = require('express-async-handler');

import NoteModel from '../models/note-model';
import UserModel from '../models/user-model';

//@desc Get all users
//@route GET /users
//@access Private
export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await UserModel.find().select('-password').lean();
  if (!users?.length) {
    res.status(400).json({ message: 'No users found' });
  }
  res.status(200).json(users);
});

//@desc Create new user
//@route POST /users
//@access Private
export const createNewUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, password, roles } = req.body;

    //Confirm data
    if (!username || !password || !Array.isArray(roles) || !roles.length) {
      res.status(400).json({ message: 'All fields are required' });
    }

    //Check for duplicate
    const duplicate = await UserModel.findOne({ username }).lean().exec();

    if (duplicate) {
      res.status(409).json({ message: 'Duplicate username' });
    }
    //Hash password

    const hashedPassword = await bcrypt.hash(password, 10); //salt rounds

    const userObject = { username, password: hashedPassword, roles };

    //Create and store new user
    const user: UserType = await UserModel.create(userObject);

    if (user) {
      //created
      res.status(201).json({ message: `New user ${username} created` });
    } else {
      res.status(400).json({ message: 'Invalid user data received' });
    }
  }
);

//@desc Update a user
//@route PATCH /users
//@access Private
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { id, username, roles, isActive, password } = req.body;

  //Confirm data
  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof isActive !== 'boolean'
  ) {
    res.status(400).json({ message: 'All fields are required' });
  }

  const user = await UserModel.findById(id).exec();

  if (!user) {
    res.status(400).json({ message: 'User not found' });
  }

  //Check for duplicate
  const duplicate = await UserModel.findOne({ username }).lean().exec();
  //Allow updates to the original User

  if (duplicate && duplicate?._id.toString() !== id) {
    res.status(409).json({ message: 'Duplicate username' });
  }

  user.username = username;
  user.roles = roles;
  user.isActive = isActive;

  if (password) {
    //Hash password
    user.password = await bcrypt.hash(password, 10); //salt rounds
  }

  const updatedUser = await user.save();
  res.json({ message: `${updatedUser.username} updated` });
});

//@desc Delete a user
//@route DELETE /users
//@access Private
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id) {
    res.status(400).json({ message: 'User ID Required' });
  }
  const notes = await NoteModel.findOne({ user: id }).lean().exec();

  if (notes != null) {
    res.status(400).json({ message: 'User has assigned notes' });
  }

  const user = await UserModel.findById(id).exec();

  if (!user) {
    res.status(400).json({ message: 'User not found' });
  }

  const result = await user.deleteOne();
  const reply = `Username ${result.username} with ID ${result._id} deleted`;

  res.json(reply);
});
