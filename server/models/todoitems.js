
const mongoose = require('mongoose');

const TodoItemsSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('TodoItem', TodoItemsSchema); 

