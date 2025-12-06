import chalk from "chalk";


export const testService = async () => {
  try {
    return "Test Passed!"
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};
