import { Request, Response } from "express";
import { handleError } from "../../../utils/handleErrors";
import { testService } from "../services/testService";

export const handleTest = async (req: Request, res: Response) => {
  try {
    const testResult = await testService();
    return res.send(testResult);
  } catch (error) {
    handleError(res, error);
  }
};
