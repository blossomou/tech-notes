import { Schema } from 'mongoose';

import { UserType } from './user-types.interfaces';

export interface NoteType {
  user: Schema.Types.ObjectId | UserType;
  title: string;
  text: string;
  isCompleted: boolean;
}
