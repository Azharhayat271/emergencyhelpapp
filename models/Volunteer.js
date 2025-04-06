// models/Volunteer.js
import mongoose from 'mongoose'

const volunteerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
});


const VolunteerModel = mongoose.model("Volunteer", volunteerSchema)

export { VolunteerModel }
// module.exports = mongoose.model("Volunteer", volunteerSchema);