require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")

const app = express();

mongoose.set('strictQuery', true);

const PORT = process.env.AUTH_PORT;
mongoose.connect(process.env.CONNECTION_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(error.message));

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));


app.use(express.json());
app.use(cors())

const authRouter = require("./routes/auth");
app.use("/api/auth", authRouter);

app.listen(process.env.AUTH_PORT, () =>
  console.log(`Auth Server started on port ${process.env.AUTH_PORT}`)
);
