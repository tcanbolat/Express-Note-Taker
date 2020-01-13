// =======================================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our database file
// =======================================================================================
const path = require("path");
const fs = require("fs");

// Route
// =============================================================
module.exports = app => {
  // Displays api of all notes from database file
  app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../db/db.json"));
  });
};
