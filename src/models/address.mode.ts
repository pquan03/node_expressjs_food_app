import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
    userId: { type: String, required: true},
    addressLine1: { type: String, required: true},
    postalCode: { type: String, required: true},
    default: { type: Boolean, default: false},
    deliveryInstructions: { type: String, required: false},
    latitude: { type: Number, required: true},
    longitude: { type: Number, required: true},
})  

export default mongoose.model("Address", AddressSchema);