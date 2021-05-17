const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const attendanceSchema = new Schema({
    time: {
        type: Date,
        default: Date.now,
    },
    check: {
        type: String,
        enum: ['Checkin', 'Checkout'],
        default: 'Checkin'
    },
    status: {
        type: String,
        default: 'Pending'
    },
});


module.exports = mongoose.model("Attendance", attendanceSchema);