import { Request, Response } from 'express';
import asyncHandler = require('express-async-handler');

import NoteModel from '../models/note-model';

//@desc Get all notes
//@route GET /notes
//@access Private
export const getAllNotes = asyncHandler(async (req: Request, res: Response) => {
  const notes = await NoteModel.find().populate('user', '_id username');

  if (!notes?.length) {
    res.status(400).json({ message: 'No notes found' });
    return;
  }

  res.status(200).json(notes);
});

//@desc Create new note
//@route POST /notes
//@access Private
export const createNewNote = asyncHandler(
  async (req: Request, res: Response) => {
    const { user, title, text } = req.body;

    //Confirm data
    if (!user || !title || !text) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    // Check for duplicate title
    const duplicate = await NoteModel.findOne({ title }).lean().exec();

    if (duplicate) {
      res.status(409).json({ message: 'Duplicate note title' });
      return;
    }

    //Create and store new note
    const note = await NoteModel.create({ user, title, text });

    if (!note) {
      res.status(400).json({ message: 'Invalid note data received' });
      return;
    }

    res.status(201).json({ message: `New note ${title} created` });
  }
);

//@desc Update a note
//@route PATCH /notes
//@access Private
export const updateNote = asyncHandler(async (req: Request, res: Response) => {
  const { _id, user, title, text, isCompleted } = req.body;

  //Confirm data
  if (!_id || !user || !title || !text || typeof isCompleted !== 'boolean') {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }

  const note = await NoteModel.findById(_id).exec();

  if (!note) {
    res.status(400).json({ message: 'Note not found' });
    return;
  }

  //check if it is the right user updating
  if (note.user != user._id) {
    res.status(400).json({ message: 'unauthorized user for editing note' });
    return;
  }

  // Check for duplicate title
  const duplicate = await NoteModel.findOne({ title }).lean().exec();

  // Allow renaming of the original note
  if (duplicate && duplicate?._id.toString() !== _id) {
    res.status(409).json({ message: 'Duplicate note title' });
    return;
  }

  note.user = user;
  note.title = title;
  note.text = text;
  note.isCompleted = isCompleted;

  const updatedNote = await note.save();
  res.json({ message: `${updatedNote.title} updated` });
});

// @desc Delete a note
// @route DELETE /notes
// @access Private

export const deleteNote = asyncHandler(async (req: Request, res: Response) => {
  const { _id } = req.body;

  if (!_id) {
    res.status(400).json({ message: 'Note Id Required' });
    return;
  }
  const note = await NoteModel.findById(_id).exec();

  if (!note) {
    res.status(400).json({ message: 'Note not found' });
    return;
  }

  const result = await note.deleteOne();
  const reply = `Username ${result.title} with ID ${result._id} deleted`;

  res.json(reply);
});
