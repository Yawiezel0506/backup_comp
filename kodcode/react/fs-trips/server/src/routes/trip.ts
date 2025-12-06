import express from 'express';
import { requireAuth } from '../middleware/auth';
import {
  getAllTripsController,
  getTripByIdController,
  createTripController,
  updateTripController,
  deleteTripController,
} from '../controllers/trip';

const router = express.Router();

// Get all trips
router.get('/', getAllTripsController);

// Get a trip by ID
router.get('/:id', getTripByIdController);

// Create a new trip (protected with requireAuth)
router.post('/', requireAuth, createTripController);

// Update a trip by ID (protected with requireAuth)
router.put('/:id', requireAuth, updateTripController);

// Delete a trip by ID (protected with requireAuth)
router.delete('/:id', requireAuth, deleteTripController);

export default router;
