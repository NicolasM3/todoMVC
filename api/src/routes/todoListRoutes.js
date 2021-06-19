module.exports = function(app) {
    var todoList_controller = require('../controllers/todoListController');
  
    app.get('/', (req, res) =>{
        return res.json({message: 'Brightcities RESTful API is working!'})
    })

    app.route('/tasks')
      .get(todoList_controller.get_all)
      .post(todoList_controller.create_task)

    app.route('/task/:taskId')
        .put(todoList_controller.update_task)
        .get(todoList_controller.get_task)
        .delete(todoList_controller.remove_task)
};