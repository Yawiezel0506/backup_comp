export const productsType = `#graphql
    type Product {
        name: String
        price: Float
        quantity: Int
        tags: [String]
    }

    input ProductInput {
        name: String
        price: Float
        quantity: Int
        tags: [String]
    }
`;

export const productsQuery = `#graphql
    getProduct(id: String): Product
    getAllProductsWithTerm(query: [String]): [Product]
`;

export const productsMutation = `#graphql
    createProduct(product: ProductInput): Product
    deleteProduct(id: String): Boolean
    updateProduct(id: String, newProduct: ProductInput): Product
    setQuantity(id: String, quantity: Int): Boolean
`;
