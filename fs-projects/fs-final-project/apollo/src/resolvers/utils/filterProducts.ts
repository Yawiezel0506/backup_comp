export const filterProducts = (query: any[], products: any[]) => {
  let filterArray = [];
    query.map((product, i) => {
      filterArray = products.filter(() => {
        return products[i] == query[i];
      });
    });
  return filterArray
};
