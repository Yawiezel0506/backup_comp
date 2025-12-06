import { Request, Response } from "express";
import {
  getAllTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
} from "../utils/trips";
import { Trip } from "../models/trip";

// Get all trips
export const getAllTripsController = (req: Request, res: Response) => {
  const trips = getAllTrips();
  res.json(trips);
};

// Get a trip by ID
export const getTripByIdController = (req: Request, res: Response) => {
  const tripId: string = req.params.id;

  const trip = getTripById(tripId);

  if (!trip) {
    return res.status(404).json({ error: "Trip not found" });
  }

  res.json(trip);
};

// Create a new trip
export const createTripController = (req: Request, res: Response) => {
  const newTrip: Trip = req.body; // Assumes request body contains trip data
  console.log(newTrip);
  const createdTrip = createTrip(newTrip);
  console.log(createdTrip);

  res.status(201).json(createdTrip);
};

// Update a trip by ID
export const updateTripController = (req: Request, res: Response) => {
  const tripId: string = req.params.id;
  const updatedTripData: Trip = req.body; // Assumes request body contains updated trip data
  updatedTripData.id = tripId;

  const updatedTrip = updateTrip(updatedTripData);

  if (!updatedTrip) {
    return res.status(404).json({ error: "Trip not found" });
  }

  res.json(updatedTrip);
};

// Delete a trip by ID
export const deleteTripController = (req: Request, res: Response) => {
  const tripId: string = req.params.id;
  const deletedTrip = deleteTrip(tripId);

  if (!deletedTrip) {
    return res.status(404).json({ error: "Trip not found" });
  }

  res.json(deletedTrip);
};
