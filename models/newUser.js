// const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
// const attendance = require('./attendance')


const newUserSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    fullname: String,
    contactNumber: String,
    type: String,
    department: String,
    role: String,
    email: String,
    gender: String,
    dob: String,
    attendance: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Attendance'
        }
    ]
});
newUserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", newUserSchema);