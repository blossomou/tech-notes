import * as express from 'express';

import { createNewNote, deleteNote, getAllNotes, updateNote } from '../controllers/notes-controller';

const router = express.Router();
router
  .route('/')
  .get(getAllNotes)
  .post(createNewNote)
  .patch(updateNote)
  .delete(deleteNote);

export default router;
