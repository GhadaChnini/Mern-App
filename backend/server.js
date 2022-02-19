const express = require("express");
// const notes = require("./data/notes");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
// const contacts = require("./data/contacts");
const userRoutes = require("./routes/userRoutes");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");
const noteRoutes = require("./routes/noteRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// app.get("/api/notes", (req, res) => {
//   res.json(notes);
// });

// app.get("/api/contacts", (req, res) => {
//   res.json(contacts);
// });

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/contacts", contactRoutes);


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started on PORT ${PORT}`));