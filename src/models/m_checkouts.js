import Mongoose from "../config/connection.js"

const { model, Schema } = Mongoose

const schemaOptions = {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at"},
}
const checkoutsSchema = new Schema(
    {
        invoice: String,
        user: {
            _id: String,
            full_name: String,
            email: String
        },
        cart: Array,
        address: {
            _id: String,
            name: String
        },
        status: Boolean,
        total: Number
    },
    schemaOptions
);

export default model("Checkouts", checkoutsSchema);