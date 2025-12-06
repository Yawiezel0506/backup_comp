"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUserById = exports.getUserByEmail = void 0;
const uuid_1 = require("uuid");
// Example in-memory data store for users
const users = [
    {
        id: '1',
        email: 'user1@example.com',
        password: 'password1', // In a real application, you should hash and salt the passwords
        // Add other user-related fields here
    },
    {
        id: '2',
        email: 'user2@example.com',
        password: 'password2',
        // Add other user-related fields here
    },
    // Add more user objects here...
];
// Get a user by email
function getUserByEmail(email) {
    return users.find((user) => user.email === email);
}
exports.getUserByEmail = getUserByEmail;
// Get a user by ID
function getUserById(id) {
    return users.find((user) => user.id === id);
}
exports.getUserById = getUserById;
// Create a new user
function createUser(newUser) {
    newUser.id = (0, uuid_1.v4)();
    users.push(newUser);
    return newUser;
}
exports.createUser = createUser;
