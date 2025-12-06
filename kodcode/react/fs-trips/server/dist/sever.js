"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const trip_1 = __importDefault(require("./routes/trip"));
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Trip routes
app.use('/api/trips', trip_1.default);
app.use('/api/auth', auth_1.default);
app.listen(3000, () => {
    console.log(`Server is up and running`);
});
