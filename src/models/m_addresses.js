import Mongoose from "../config/connection.js"

const { model, Schema } = Mongoose

const schemaOptions = {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at"},
}
const addressesSchema = new Schema(
    {
        user_id: String,
        name: String,
        address: String,
        province: {
            _id: String,
            name: String
        },
        regency: {
            _id: String,
            name: String
        },
        district: {
            _id: String,
            name: String
        },
        village: {
            _id: String,
            name: String
        },
        passcode: Number,
    },
    schemaOptions
);

export default model("Addresses", addressesSchema);