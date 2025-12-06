import bannerService from "./service";

export const bannersResolvers = {
  Query: {
    getBanners: async () => {
      try {
        const response = await bannerService.getAllBanners()
        console.log(response);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    getBanner: async (_: any, { category }: {category: string}) => {
        try {
          const response = await bannerService.getByCategory(category);
          console.log(response);
          return response;
        } catch (error) {
          console.error(error);
          throw new Error("Error fetching banner by category");
        }
      },
  },
  Mutation: {
  },
};
