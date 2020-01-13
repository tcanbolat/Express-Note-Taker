// =======================================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our database file
// =======================================================================================
const path = require("path");
const fs = require("fs");

// Routes
// =============================================================

module.exports = app => {
  // Displays api of all notes from database file
  app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../db/db.json"));
  });

  // Create New Notes - takes in JSON input from the api/notes window
  app.post("/api/notes", function(req, res) {
    // create new array to store notes
    let newNote = [];
    // get notes from db file
    const notes = fs.readFileSync("./db/db.json");
    // if there are old notes, store them in our new array
    if (notes.length > 0) {
      newNote = JSON.parse(notes);
    }
    // create a note object from req data. Create ID for activeNote.
    // Can't equal 0 or renderActiveNote won't see it.
    const data = {
      id: newNote.length + 1,
      title: req.body.title,
      text: req.body.text
    };

    // add new note to array
    newNote.push(data);
    fs.writeFile("./db/db.json", JSON.stringify(newNote), () => {
      console.log("wrote new note to DataBase");
    });
    // send note back to DOM for rendering
    res.json(data);
  });

  app.delete("/api/notes/:id", function(req, res) {

    const deleteNote = req.params.id -1;
    console.log("noteID: " + deleteNote);

    const newNotes = [];

    let notes = fs.readFileSync("./db/db.json");

    notes = JSON.parse(notes);

    notes.splice(deleteNote, 1);
    console.log(notes);

    for (let i = 0; i < notes.length; i++) {
        notes[i].id = i + 1;
        newNotes.push(notes[i]);
      }
    
    fs.writeFile("./db/db.json", JSON.stringify(newNotes), () => {
        console.log("wrote back to file");
      });

    res.json(newNotes);


    // fs.readFile("./db/db.json", function(err, data) {
    //   if (err) throw err;
    //   var arrayOfNotes = JSON.parse(data);
    //   for (let x = 0; x < arrayOfNotes.length; x++) {
    //     if (arrayOfNotes[x].id == noteID) {
    //       delete arrayOfNotes[x];
    //       console.log(arrayOfNotes);
    //     }
    //   }

    //   fs.writeFile(
    //     "./db/db.json",
    //     JSON.stringify(arrayOfNotes),
    //     "utf-8",
    //     function(err) {
    //       if (err) throw err;
    //       console.log("Done!");
    //     }
    //   );

    //   res.json(arrayOfNotes);
    // });

  });
};
