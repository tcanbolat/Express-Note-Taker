// =======================================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our database file
// =======================================================================================
const path = require("path");
const fs = require("fs");

// Routes
// =============================================================

module.exports = (app) => {

// Displays api of all notes from database file
app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../db/db.json"));
  });
  
  // Create New Notes - takes in JSON input from the api/notes window 
  app.post("/api/notes", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    const newNote = req.body;
  
    // Using a RegEx Pattern to remove spaces from newNote
    //newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newNote);
  
    fs.readFile('./db/db.json', function(err, data) {
      if (err) throw err
    
      const arrayOfObjects = JSON.parse(data)
      arrayOfObjects.push(newNote)
  
      console.log(arrayOfObjects)
  
  
      fs.writeFile('./db/db.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
        if (err) throw err
        console.log('Done!')
      })
    
    })
  
  
  
    res.json(newNote);
  });
};