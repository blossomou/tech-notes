import { NoteType } from '@tech-notes/api-interfaces';
import mongoose, { Schema } from 'mongoose';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const AutoIncrement = require('mongoose-sequence')(mongoose);

export interface INoteSchema extends NoteType {
  _id: string;
}

const noteSchema = new Schema<NoteType>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

noteSchema.plugin(AutoIncrement, {
  inc_field: 'ticket',
  id: 'ticketNums',
  start_seq: 500,
});

export default noteSchema;
