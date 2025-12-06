import { CategoryModel } from "../../db/categories";
import { Category } from "../../interfaces/category";

const getAllCategories = async () => {
  try {
    const categories = await CategoryModel.find({}).exec();
    if (!categories) {
      return;
    }
    return categories;
  } catch (error) {
    console.log(error);
  }
};

const setClick = async (id: string) => {
  try {
    const res = await CategoryModel.updateOne(
      { _id: id },
      { $inc: { clicks: 1 } }
    );
    if (!res) {
      return;
    }
    return res;
  } catch (error) {
    console.log(error);
  }
};

const createCategory = async (category: Category) => {
  try {
    const res = await CategoryModel.create(category);
    if (!res) {
      return;
    }
    return res;
  } catch (error) {
    console.log(error);
  }
};

const createCategories = async (category: any) => {
  try {
    const categories = [];
    for (const name in category) {
      categories.push({
        name,
        image: category[name],
        clicks: Math.floor(Math.random() * 100) + 1,
      });
    }

    const res = await CategoryModel.create(categories);
    if (!res) {
      return;
    }
    return res;
  } catch (error) {
    console.log(error);
  }
};

const createCategories2 = async (categories: any) => {
  try {
    const res = await CategoryModel.create(categories);
    if (!res) {
      return;
    }
    return res;
  } catch (error) {
    console.log(error);
  }
};

export default {
  getAllCategories,
  setClick,
  createCategory,
  createCategories,
  createCategories2
};
