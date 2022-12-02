import { model } from 'mongoose';

import noteSchema, { INoteSchema } from '../schema/note-schema';

const NoteModel = model<INoteSchema>('User', noteSchema);

export default NoteModel;
