const express = require('express');
const { handleCreateNewTodo, handleDeleteTodo, handleEditTodo } = require('../controllers/todo');
const router = express.Router();

router.post('/', handleCreateNewTodo)
router.get('/delete', handleDeleteTodo)
router.post('/edit', handleEditTodo)
module.exports = router;

// /todo , post method