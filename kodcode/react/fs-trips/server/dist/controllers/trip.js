"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTripController = exports.updateTripController = exports.createTripController = exports.getTripByIdController = exports.getAllTripsController = void 0;
const trips_1 = require("../utils/trips");
// Get all trips
const getAllTripsController = (req, res) => {
    const trips = (0, trips_1.getAllTrips)();
    res.json(trips);
};
exports.getAllTripsController = getAllTripsController;
// Get a trip by ID
const getTripByIdController = (req, res) => {
    const tripId = req.params.id;
    const trip = (0, trips_1.getTripById)(tripId);
    if (!trip) {
        return res.status(404).json({ error: 'Trip not found' });
    }
    res.json(trip);
};
exports.getTripByIdController = getTripByIdController;
// Create a new trip
const createTripController = (req, res) => {
    const newTrip = req.body; // Assumes request body contains trip data
    console.log(newTrip);
    const createdTrip = (0, trips_1.createTrip)(newTrip);
    console.log(createdTrip);
    res.status(201).json(createdTrip);
};
exports.createTripController = createTripController;
// Update a trip by ID
const updateTripController = (req, res) => {
    const tripId = req.params.id;
    const updatedTripData = req.body; // Assumes request body contains updated trip data
    updatedTripData.id = tripId;
    const updatedTrip = (0, trips_1.updateTrip)(updatedTripData);
    if (!updatedTrip) {
        return res.status(404).json({ error: 'Trip not found' });
    }
    res.json(updatedTrip);
};
exports.updateTripController = updateTripController;
// Delete a trip by ID
const deleteTripController = (req, res) => {
    const tripId = req.params.id;
    const deletedTrip = (0, trips_1.deleteTrip)(tripId);
    if (!deletedTrip) {
        return res.status(404).json({ error: 'Trip not found' });
    }
    res.json(deletedTrip);
};
exports.deleteTripController = deleteTripController;
