// Dependencies
// =============================================================
const express = require("express");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + '/public'));

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from constious URLs.
// ================================================================================
require("./routes/htmlRoutes")(app);
require("./routes/apiGetRoute")(app);
require("./routes/apiPostRoute")(app);
require("./routes/apiDeleteRoute")(app);
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log(`Our app is running on port ${ PORT }`);
});