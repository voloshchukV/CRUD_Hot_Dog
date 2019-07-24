const mongoose = require('mongoose');

var hotdogsSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: 'This field is required.'
    },
    Length: {
        type: String,
    },
    Weight: {
        type: String,
    }
});

mongoose.model('Hotdogs', hotdogsSchema);