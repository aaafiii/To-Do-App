const Todo = require('../models/todo.js');

async function handleCreateNewTodo(req, res) {
    try {
        const { title, description } = req.body;
        if (req.user) {
            await Todo.create({
                title: title,
                description: description,
                author: req.user.id
            })
        }
        return res.redirect('/')
    } catch (error) {
        console.log(error);
        return res.json({ status: false, message: "Error while creating new todo", error: error.message });
    }
}

async function handleDeleteTodo(req, res) {
    try {
        const { id } = req.query;
        if (req.user) {
            await Todo.findByIdAndDelete(id);
            return res.redirect('/');
        }
        else {
            return res.redirect('/login');
        }
    } catch (error) {
        console.log(error);
    }
}

async function handleEditTodo(req, res) {
    try {
        const { title, description, status } = req.body;
        const { id } = req.query;
        const updatedTodo = await Todo.findByIdAndUpdate(id, { title: title, description: description, status: status });
        return res.redirect('/');
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    handleCreateNewTodo,
    handleDeleteTodo,
    handleEditTodo
}