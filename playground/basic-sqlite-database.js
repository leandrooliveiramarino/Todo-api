var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/basic_sqlite_database.sqlite'
});

var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validade: {
			len: [1, 250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

sequelize.sync({
//	force: true
}).then(function() {
	console.log('Everything is synced')

	Todo.findById(2).then(function(todo){
		return console.log(todo.toJSON());
	}).catch(function(e){
		console.log('Todo not found');
	});

	/*Todo.create({
		description: 'Clean the office'
	}).then(function(todo){
		return Todo.create({
			description: 'Take out trash'
		});
	}).then(function(){
		return Todo.findAll({
			where: {
				description: {
					$like: '%Office%'
				}
			}
		});
	}).then(function(todos){
		todos.forEach(function(todo){
			console.log(todo.toJSON());
		});
	}).then(function(){
		return Todo.findById(1);
	}).then(function(todo){
		if(todo) {
			console.log(todo.toJSON());
		} else {
			console.log('No todo found');
		}
	}).catch(function(e){
		console.log(e);
	});*/
});