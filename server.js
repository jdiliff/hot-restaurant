// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
require('dotenv').config()


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT;
//var PORT = 3010;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
var customer = [
    {
    customerName: "test",
    phoneNumber: "123456",
    customerEmail: "abc123@gmail.com",
    customerID: "1"
    }
    ];

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
  });
  
  app.get("/add", function (req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
  });
  
  // Displays all tables
  app.get("/api/tables", function (req, res) {
    return res.json(customer);
  });
  
  // Displays a , or returns false
  app.get("/api/customer/:character", function (req, res) {
    var chosen = req.params.character;
  
    console.log(chosen);
  
    for (var i = 0; i < customer.length; i++) {
      if (chosen === customer[i].routeName) {
        return res.json(customer[i]);
      }
    }
  
    return res.json(false);
  });

  // Create New customer - takes in JSON input
app.post("/api/customer", function (req, res) {

    var newcharacter = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newcharacter);
  
    customer.push(newcharacter);
  
    res.json(newcharacter);
  });
  
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
  

