import express from "express";
import router from "./router/router";
import morgan from "./logger/morgan";
import cors from "cors";
import { config } from "dotenv";
import chalk from "chalk";
import cookieParser from "cookie-parser";

const app = express();
config();

app.use(morgan);
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(router);

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  console.log(chalk.blueBright(`Server listening on port: ${PORT}`));
});
