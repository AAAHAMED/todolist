const router = require('express').Router();
const TodoItem = require('../models/todoitems'); 

router.post('/api/item', async (req, res) => {
    try {
        const newItem = new TodoItem({
            item: req.body.item
        });
        const savedItem = await newItem.save();
        res.status(200).json(savedItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/api/item', async (req, res) => {
    try {
        const allTodoItems = await TodoItem.find({});
        res.status(200).json(allTodoItems);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/api/item/:id', async (req, res) => {
    try {
        const updateItem = await TodoItem.findByIdAndUpdate(req.params.id, {$set: req.body}, { new: true });
        if (!updateItem) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(200).json("Item Updated");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/api/item/:id', async (req, res) => {
    try {
        const deleteItem = await TodoItem.findByIdAndDelete(req.params.id);
        if (!deleteItem) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(200).json("Item Deleted");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
