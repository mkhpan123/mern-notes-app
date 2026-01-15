const express = require("express");
const notesRoutes = require("./routes/notesRoutes");
const errorHandler = require("./middleware/errorHandler"); // 👈 ADD

const app = express();

app.use(express.json());

app.use("/notes", notesRoutes);

// 👇 ERROR HANDLER MUST BE LAST
app.use(errorHandler);

module.exports = app;
