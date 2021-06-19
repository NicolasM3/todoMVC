const todo = require("../models/todoListModel");

exports.get_all = function(req, res, next) {
    todo.findAll({order:  [['createdAt', 'ASC']]})
        .then((result) => {
          res.json(result);
        })
        .catch(next);
  };

exports.create_task = async function(req, res){ 
    const { todo_text, completed } = req.body;       
    const task = await todo.create({ todo_text, completed });

    res.setHeader('access-control-allow-origin', '*');
    return res.json(task);
};

exports.get_task = function(req, res, next)
{
    todo.findByPk(req.params.taskId)
    .then((result) => {
        res.json(result);
      })
      .catch(next);
};

exports.update_task = function(req, res, next) 
{
    todo.findByPk(req.params.taskId)
    .then((result) => {
        result.update(req.body)
        res.json(result);
      })
      .catch(next);
};

exports.remove_task = function(req, res, next)
{
    todo.destroy({
        where: {
            "id" : req.params.taskId
        },
    }).then((result) =>{
        res.json({"res": result + " rows excluded"});
    })
    .catch(next);
};
