import mongoose from "mongoose";

const admiSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const adminModel = mongoose.models.Admin || mongoose.model("Admin", admiSchema);

export { adminModel as Admins };