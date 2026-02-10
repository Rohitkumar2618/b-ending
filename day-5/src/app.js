const express = require("express");

const app = express();

const notes = [];

// middleware to parse json data
app.use(express.json());

// route to create a new note
app.post("/notes", (req, res) => {
  console.log(req.body);

  notes.push(req.body);

  res.status(201).json({
    message: "Note created successfully",
  });
});

// route to delete a note
app.delete("/notes/:index", (req, res) => {
  const index = req.params.index;
  delete notes[index];
  res.status(200).json({
    message: "Note deleted successfully",
  });
});

// route to update a note

app.patch("/notes/:index", (req, res) => {
  const index = req.params.index;

  notes[index].description = req.body.description;

  res.status(200).json({
    message: "Note updated successfully",
  });
});

// route to get all notes
app.get("/notes", (req, res) => {
  res.json(notes);
  res.status(200).json({
    message: "Notes retrieved successfully",
  });
});

module.exports = app;
