var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
const cors = require('cors')

app.use(express.json())
app.use(cors())

var routes = require('./src/routes/todoListRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('Brightcities RESTful API server started on: ' + port);
