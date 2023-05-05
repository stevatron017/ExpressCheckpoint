const db = require('./database');
const Sequelize = require('sequelize');

// Make sure you have `postgres` running!

//---------VVVV---------  your code below  ---------VVV----------

const Task = db.define('Task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  due: Sequelize.DATE,
});

const Owner = db.define('Owner', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Task.belongsTo(Owner);
Owner.hasMany(Task);

//these methods are called on the whole table
Task.clearCompleted = function() {
  return this.destroy({where: {complete: true}})
}

Task.completeAll = function() {
  return this.update({complete: true}, {where: {complete: false}})
}

//this means we are calling this method on a row, not the whole table
Task.prototype.getTimeRemaining = function() {
  if(!this.due) return Infinity;
  return this.due - new Date();
}

Task.prototype.isOverdue = function() {
  if(this.complete) return false;
  if(this.due - new Date() < 0) return true
  return false;
}

Task.prototype.assignOwner = function(owner){ //zeke, id: 1 // clean room, ownerId: zeke.id
  // return this.OwnerId = owner.id;
  return this.setOwner(owner)
}

Owner.getOwnersAndTasks = function (){
  return this.findAll({include: Task}) //[{zeke, [{tak1}, {task2}...]}, {omri, [{tak1}, {task2...]}]
}

//getTasks is a magic method created by the associations on lines 33 and 34
Owner.prototype.getIncompleteTasks = async function (){
  const tasks = await this.getTasks();
  const incompleteTasks = tasks.filter((task) => {
    return !task.complete;
  });
  return incompleteTasks;
}

Owner.beforeDestroy(function (owner) {
  if (owner.name === 'Grace Hopper') {
    throw new Error('Grace Hopper is unstoppable');
  }
});
//---------^^^---------  your code above  ---------^^^----------

module.exports = {
  Task,
  Owner,
};
