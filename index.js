// Import needed libraries
const express = require("express");
const Cron = require("node-cron");
const fs = require("fs");

// Initialize express
const app = express();

// Set  our default port
app.set("port", process.env.PORT || 3456);

/**
 * Cron job that deletes a file after every minute
 */

const deleteFileCron = Cron.schedule("* * * * *", () => {
  console.log("Job has started");
  fs.unlink("./tobedeletedfile.txt", err => {
    if (err) {
      console.log(`Failed to delete file due to ${err.message}`);
    } else {
      console.log("File has been deleted successfully");
    }
  });
});

// Its a scheduled task method that starts a scheduled task
deleteFileCron.start()

// Initialize our server
app.listen(app.get("port"), err => {
  // If something goes wrong when initializing the server
  if (err) console.log(`Server failure due to ${err.message}`);
  console.log(`Server running on port ${app.get("port")}`);
});
