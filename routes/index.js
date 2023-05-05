const express = require('express');
const router = express.Router();
const todos = require('../models/express-models/todos');
module.exports = router;

// write your routes here. Feel free to split into multiple files if you like.
//localhost:3000/users/
router.get('/', (req, res) => {
    const list = todos.listPeople();
    res.send(list);
})
//localhost:3000/users/zeke/tasks
router.get('/:name/tasks', (req, res) => {
    const name = req.params.name;
    if(!todos.list(name)){
        res.send(404);
    }
    const taskList = todos.list(name);
    res.send(taskList);
})

// router.post('/:name/tasks', (req, res) => {
//     const name = req.params.name; //obama
//     const task = req.body;
//     const list = todos.listPeople();
//     const addedTodo = todos.add(name, task);
//     if(!list.includes(name)){
//         let err = new Error();
//         err.status = 404;
//         throw err;
//     }
//       if (!req.body.content) {
//       let err = new Error();
//       err.status = 400;
//       throw err;
//     }
//     res.status(201).send(addedTodo);
// })

router.post('/:name/tasks', (req, res, next) => {
    try {
      const addedTodo = todos.add(req.params.name, req.body);
      if (!req.body.content) {
        let err = new Error();
        err.status = 400;
        throw err;
      }
      res.status(201).json(addedTodo);
    } catch (err) {
      next(err);
    }
  });

///nimit/tasks/1
  router.put('/:name/tasks/:idx', (req, res) => {
    const name = req.params.name;
    const idx = req.params.idx;
    const completed = todos.complete(name, idx);
    res.send(completed);
  })

  router.delete('/:name/tasks/:idx', (req, res) => {
    const name = req.params.name;
    const idx = req.params.idx;
    const removed = todos.remove(name, idx);
    res.send(204)
  })

