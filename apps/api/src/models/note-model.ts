import { model } from 'mongoose';

import noteSchema, { INoteSchema } from '../schema/note-schema';

const NoteModel = model<INoteSchema>('Note', noteSchema);

export default NoteModel;
