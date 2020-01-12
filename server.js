// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// =============================================================

// route that sends the user to the main page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// route that sends the user to the notes page
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Displays all notes
app.get("/api/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});

// Create New Notes - takes in JSON input
app.post("/api/notes", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newNote = req.body;

  // Using a RegEx Pattern to remove spaces from newNote
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  // newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();

  console.log(newNote);

  fs.readFile('./db/db.json', function(err, data) {
    if (err) throw err
  
    var arrayOfObjects = JSON.parse(data)
    arrayOfObjects.push(newNote)

    console.log(arrayOfObjects)


    fs.writeFile('./db/db.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
      if (err) throw err
      console.log('Done!')
    })
  
  })



  res.json(newNote);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
