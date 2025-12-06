import { PopularModel } from '../../db/populars'

const getAllPopular = async () => {
  try {
    const populars = await PopularModel.find({});
    console.log(populars.length);
    
    if (!populars) {
      return "no popular available";
    }

    return populars;
  } catch (error) {
    console.log(error);
  }
};

export default getAllPopular;