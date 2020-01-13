fs = require("fs");

module.exports = app => {
  app.delete("/api/notes/:id", function(req, res) {
    const deleteNote = req.params.id - 1;

    const newNotes = [];

    let notes = fs.readFileSync("./db/db.json");

    notes = JSON.parse(notes);

    notes.splice(deleteNote, 1);

    for (let i = 0; i < notes.length; i++) {
      notes[i].id = i + 1;
      newNotes.push(notes[i]);
    }

    fs.writeFile("./db/db.json", JSON.stringify(newNotes), () => {
      console.log("Deleted Note");
    });

    res.json(newNotes);
  });
};
