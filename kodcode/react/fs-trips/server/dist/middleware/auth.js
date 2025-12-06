"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = exports.tokenArray = void 0;
// Initialize an array to store generated tokens
exports.tokenArray = ['test-token'];
// Middleware to generate and check the random token
const requireAuth = (req, res, next) => {
    const authToken = req.headers['authorization'];
    // Check if the provided token matches any token in the array
    if (!authToken)
        return res.status(401).json({ error: 'Unauthorized' });
    if (!exports.tokenArray.includes(authToken)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};
exports.requireAuth = requireAuth;
