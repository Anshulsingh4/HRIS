const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const leaveSchema = new Schema({
    requestType: {
        type: String,
        enum: ['PL', 'SL', 'BL'],
        default: 'PL'
    },
    from: {
        type: date
    },
    to: {
        type: date
    },
    status: {
        type: String
    },
});


module.exports = mongoose.model("Leave", leaveSchema);