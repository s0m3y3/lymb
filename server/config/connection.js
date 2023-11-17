const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lymb');
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://yaX102:qGyiTIORHrOTuADD@yax102.tkf597m.mongodb.net/');
module.exports = mongoose.connection;
