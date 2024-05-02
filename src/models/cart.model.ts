import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}, 
    productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true},
    addtitives: {type: Array, default: [], required: false},
    totalPrice: {type: Number, required: true},
    quantity: {type: Number, required: true},
}, { timestamps: true})


export default mongoose.model("Cart", cartSchema);