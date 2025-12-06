import express from "express";
import morgan from "./logger/morgan";
import cors from "./cors/cors";
import chalk from "chalk";
import router from "./router/router";
import { generateInitialUsers } from "./initialData/initialDataService";
import connectToDatabase from "./mongoAccess/connectToDB";

const app = express();

const PORT = 8181;

const run = async () => {
  try {
    await connectToDatabase();

    app.listen(PORT, () => {
      console.log(chalk.blueBright(`Server listening on port: ${PORT}`));
      generateInitialUsers()
        .then(() => console.log(chalk.magentaBright("Initial Users Created!")))
        .catch((error) => console.log(error));
    });

    app.use(morgan);
    app.use(cors);
    app.use(express.json());
    app.use(router);
  } catch (error) {
    console.log("Failed to connect to server", error);
  }
};

run()
