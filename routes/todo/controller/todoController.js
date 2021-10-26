const Todo = require("../model/Todo");

async function getAllTodos(req, res) {
   try {
      let allTodos = await Todo.find({});
      res.json({ payload: allTodos });
   } catch(e) {
      res.status(500).json({message: e.message, error: error});
   }
};

async function createTodo(req, res) {
   try {
      let createdTodo = new Todo({
         todo: req.body.todo,
         isDone: req.body.isDone,
      });

      let savedTodo = await createdTodo.save();

      res.json({payload: savedTodo})

   } catch(e) {
      res.status(500).json({message: e.message, error: error});
   }
};

async function updateTodo(req, res) {
   try {
      let updatedTodo = await Todo.findByIdAndUpdate(req.body.id, req.body, {new: true});

      res.json({ payload: updatedTodo})
   } catch(e) {
      res.status(500).json({message: e.message, error: error});
   }
};

async function deleteTodo(req, res) {
   try {
      let deletedTodo = await Todo.findByIdAndRemove(req.body.id);

      res.json({ payload: deletedTodo});
   } catch(e) {
      res.status(500).json({message: e.message, error: error});
   }
};

module.exports = {
   getAllTodos,
   createTodo,
   updateTodo,
   deleteTodo
}