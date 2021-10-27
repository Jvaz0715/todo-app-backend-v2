var express = require('express');
var router = express.Router();

const {
   getAllTodos,
   createTodo,
   updateTodo,
   deleteTodo,
   sortTodoByDate,
   sortTodoByDone,
} = require("./controller/todoController")

/* GET home page. */
router.get('/', function(req, res, next) {
   res.json(true);
});

router.get('/get-all-todos', getAllTodos);

// TODO: Brush up on sort in mongodb using req.query
router.get("/get-todos-by-sort", sortTodoByDate);
router.get("/get-todos-by-done", sortTodoByDone);

router.post('/create-todo', createTodo);

router.put('/update-todo-by-id/:id', updateTodo);

router.delete('/delete-todo-by-id/:id', deleteTodo);



module.exports = router;