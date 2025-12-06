export const usersType = `#graphql
    type UserRegister {
        firstName: String!
        lastName: String!
        username: String!
        email: String!
        password: String!
        signup_time: String
        _id: String
    }

    input UserRegisterInput {
        firstName: String!
        lastName: String!
        username: String!
        email: String!
        password: String!
        confirmPassword: String!
    }
    input UserLogin {
        email: String!
        password: String!
    }
`;

export const usersQuery = `#graphql
    getAllUsers: [UserRegister!]
    getUserById(id: String!): UserRegister
`;

export const usersMutation = `#graphql
    register(user: UserRegisterInput!): UserRegister
    logIn(user: UserLogin): UserRegister
    edit(oldUser: UserRegisterInput!, newUser: UserRegisterInput!): UserRegister!

`;
