let tasks = {}; //

/*
  tasks (defined above) will be a place to store tasks by person;
  example: tasks[omri]
  {
    zeke: [{ content: 'clean room', complete: false}]
    omri: [{ content: 'clean room', complete: false}, { content: 'clean bathroom', complete: false}, etc.],
  }
*/

module.exports = {
  reset: function () {
    tasks = {}; // (this function is completed for you.)
  },

  // ==== COMPLETE THE FOLLOWING (SEE `model.js` TEST SPEC) =====
  listPeople: function () {
    const result = [];
    for(const person in tasks){
      result.push(person);
    }
    return result;
  },

  add: function (name, task) { // 'zeke', { content: 'clean other room' }
    // task.complete = false;
    if(!task.complete){
      task.complete = false;
    }
    if(tasks[name]){
      tasks[name].push(task);
    } else {
      tasks[name] = [task];
    }
    return task;
  },

  list: function (name) {
    return tasks[name];
  },

  complete: function (name, idx) {
    tasks[name][idx].complete = true;
    return tasks[name][idx];
  },

  remove: function (name, idx) {
    tasks[name].splice(idx, 1);
  },
};
