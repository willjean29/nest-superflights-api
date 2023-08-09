import { Schema } from "mongoose";
import { Collections } from '../../common/models/collections';

export const FlightSchema = new Schema({
  pilot: {
    type: String,
    required: true,
  },
  airplane: {
    type: String,
    required: true,
  },
  destinationCity: {
    type: String,
    required: true,
  },
  flightDate: {
    type: Date,
    required: true,
  },
  passengers: [{
    type: Schema.ObjectId,
    ref: Collections.Passenger
  }]
}, { timestamps: true }) 
