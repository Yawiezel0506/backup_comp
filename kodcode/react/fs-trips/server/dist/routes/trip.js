"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const trip_1 = require("../controllers/trip");
const router = express_1.default.Router();
// Get all trips
router.get('/', trip_1.getAllTripsController);
// Get a trip by ID
router.get('/:id', trip_1.getTripByIdController);
// Create a new trip (protected with requireAuth)
router.post('/', auth_1.requireAuth, trip_1.createTripController);
// Update a trip by ID (protected with requireAuth)
router.put('/:id', auth_1.requireAuth, trip_1.updateTripController);
// Delete a trip by ID (protected with requireAuth)
router.delete('/:id', auth_1.requireAuth, trip_1.deleteTripController);
exports.default = router;
