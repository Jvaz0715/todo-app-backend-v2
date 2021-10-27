const Todo = require("../model/Todo");

async function getAllTodos(req, res) {
   try {
      let allTodos = await Todo.find({});
      res.json({ payload: allTodos });
   } catch(e) {
      res.status(500).json({message: e.message, error: e});
   }
};

async function createTodo(req, res) {
   try {
      let createdTodo = new Todo({
         todo: req.body.todo,
      });

      let savedTodo = await createdTodo.save();

      res.json({payload: savedTodo})

   } catch(e) {
      res.status(500).json({message: e.message, error: e});
   }
};

async function updateTodo(req, res) {
   try {
      let updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true});

      res.json({ payload: updatedTodo})
   } catch(e) {
      res.status(500).json({message: e.message, error: e});
   }
};

async function deleteTodo(req, res) {
   try {
      let deletedTodo = await Todo.findByIdAndRemove(req.params.id);

      res.json({ payload: deletedTodo});
   } catch(e) {
      res.status(500).json({message: e.message, error: e});
   }
};

// TODO: Brush up on sort in mongodb using req.query
async function sortTodoByDate(req, res) {
   try{
      let sort = req.query.sort;
      let sortOrder = sort === "desc" ? -1 : 1;
      
      let foundTodosSorted = await Todo.find({}).sort({dateAdded: sortOrder})

      res.json({payload: foundTodosSorted})

   } catch(e){
      res.status(500).json({ message: e.message, error: e });
   }
};

async function sortTodoByDone(req, res) {
   try{
      let isDone = req.query.isDone;
      let isDoneOrder = isDone === "true" ? true : false;
      let foundTodos = await Todo.find({isDone: isDoneOrder});
      res.json({payload: foundTodos})
   } catch(e) {
      res.status(500).json({ message: e.message, error: e });
   }
};

// REFACTOR: sorting by done and date separately is fine but consider doing it in one function
// *** MUST REVISIT TO BETTER UNDERSTAND LOGIC ***
async function sort(req, res) {
   try {
      let isDone = req.query.isDone;
      let isDoneOrder = isDone === "true" ? true : false;

      let sortByDate = req.query.sort ? req.query.sort : null;
      let finalSort;
      if (!sortByDate) {
         finalSort = null;
      } else {
         finalSort = sortByDate === "asc" ? 1 : -1;
      }

      let foundTodo = await Todo.find({isDone: isDoneOrder}.sort({dateAdded: finalSort}))
      res.json({ payload: foundTodo })

   } catch(e){
      console.log(e);
   }
};

module.exports = {
   getAllTodos,
   createTodo,
   updateTodo,
   deleteTodo,
   sortTodoByDate,
   sortTodoByDone,
}