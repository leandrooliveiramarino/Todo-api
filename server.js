var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

// GET /todos
app.get('/todos', function(req, res){
	res.json(todos);
});
// GET /todos/:id
app.get('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id);
	var matchedTodo;
	_.findWhere(todos, {id: todoId});
	/*todos.forEach(function(element){
		if(element.id === todoId) {
			matchedTodo = element;
			return;
		}
	});*/

	if(!matchedTodo) {
		res.status(404).send();
		return;
	}

	res.json(matchedTodo);
});

// POST /todos
app.post('/todos', function(req, res){
	var body = _.pick(req.body, "description", "completed");
	//Use _.pick to only pick description and completed

	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		res.status(400).send();
	}

	//set body.description to trimmed value
	body.description = body.description.trim();
	body.id = todoNextId++;

	todos.push(body);
	
	console.log('description: ' + body.description);
	res.json(body);
});

app.listen(PORT, function(){
	console.log('Express listening on port ' + PORT +'!');
});