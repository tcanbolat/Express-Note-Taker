fs = require("fs");

module.exports = app => {
// Create New Notes - takes in JSON input from the api/notes window
app.post("/api/notes", function(req, res) {
    // create new array to store saved notes from DB and add the new note to it
    let newArray = [];
    // get saved notes from db file
    const notesDataBase = fs.readFileSync("./db/db.json");
    // and throw them into the new array, if their are any.
    if (notesDataBase.length > 0) {
      newArray = JSON.parse(notesDataBase);
    }
    // create a new note object from req.
    const newNote = {
      id: newArray.length + 1, // We need to add an ID to any new notes in order to delete them later using the id number.
      title: req.body.title,
      text: req.body.text
    };

    // add the new note to the array
    newArray.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(newArray), () => {
      console.log("wrote new note to DataBase");
    });
    // send the new note back
    res.json(newNote);
  });
}