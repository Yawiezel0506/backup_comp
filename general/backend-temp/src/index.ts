import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import postgraphile from "postgraphile"

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(postgraphile())

const { PORT } = process.env || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
