import jsonfile from "jsonfile";
import path from "path";
import { handleJsonfileError } from "../utils/handleErrors";

const DB_URL = path.join(__dirname, "../../DB/users.json");

type CollectionResult = Promise<Record<string, unknown>[] | Error>;

export const getCollectionFromJsonFile = async (
  collection: string
): CollectionResult => {
  try {
    const { [collection]: data } = await jsonfile.readFile(DB_URL);
    return data;
  } catch (error) {
    return handleJsonfileError(error);
  }
};

type DatabaseResult = Promise<Record<string, unknown> | Error>;
export const getDatabase = async (): DatabaseResult => {
  try {
    const data = await jsonfile.readFile(DB_URL);
    return data;
  } catch (error) {
    return handleJsonfileError(error);
  }
};

export const modifyCollection = async (
  collection: string,
  documents: Record<string, unknown>[]
): CollectionResult => {
  try {
    const data = await getDatabase();
    const newData = { ...data, [collection]: documents };
    await jsonfile.writeFile(DB_URL, newData);
    return documents;
  } catch (error) {
    return handleJsonfileError(error);
  }
};
