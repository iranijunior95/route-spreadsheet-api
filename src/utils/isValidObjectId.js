import mongoose from "mongoose";

export function objectIdIsValid(id) {
    return mongoose.Types.ObjectId.isValid(id);
}