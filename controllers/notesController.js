const mongoose = require("mongoose");
const Note = require("../models/Note");

// ==============================
// GET /notes
// ==============================
const getAllNotes = async (req, res, next) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
};


// ==============================
// GET /notes/:id
// ==============================
async function getNoteById(req, res, next) {
    try {
        const { id } = req.params;

        // 🔒 Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid note ID" });
        }

        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.json(note);
    } catch (error) {
        next(error);
    }
}

// ==============================
// POST /notes
// ==============================
async function createNote(req, res, next) {
    try {
        const { title, content } = req.body;

        const note = await Note.create({ title, content });

        res.status(201).json(note);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: error.message
            });
        }
        next(error);
    }
}

// ==============================
// PUT /notes/:id
// ==============================
async function updateNote(req, res, next) {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        // 🔒 Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid note ID" });
        }

        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, content },
            { new: true, runValidators: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.json(updatedNote);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: error.message
            });
        }
        next(error);
    }
}

// ==============================
// DELETE /notes/:id
// ==============================
async function deleteNote(req, res, next) {
    try {
        const { id } = req.params;

        // 🔒 Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid note ID" });
        }

        const deletedNote = await Note.findByIdAndDelete(id);

        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.json({ message: "Note deleted successfully" });
    } catch (error) {
        next(error);
    }
}

// ==============================
// EXPORTS
// ==============================
module.exports = {
    getAllNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
};
