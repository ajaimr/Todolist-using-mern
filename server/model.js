// models.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tode_mern', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('connected');
})
.catch(() => {
    console.log('not connected');
});


const taskSchema = new mongoose.Schema({
    name: String,
    id:String
    });



module.exports = mongoose.model('Data', taskSchema);
