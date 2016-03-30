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

var User = sequelize.define('user', {
	email: Sequelize.STRING //Outra maneira de dizer que o campo é string
});

Todo.belongsTo(User);
User.hasMany(Todo);

sequelize.sync({
	//force: true
}).then(function() {
	console.log('Everything is synced');

	User.findById(1).then(function(user){
		user.getTodos({
			where: {
				completed: false
			}
		}).then(function(todos){
			todos.forEach(function(todo){
				console.log(todo.toJSON());
			});
		});
	});

	// User.create({
	// 	email: 'leandro@gmail.com'
	// }).then(function(){
	// 	return Todo.create({
	// 		description: 'Clean Yard'
	// 	});
	// }).then(function(todo) {
	// 	User.findById(1).then(function(user){
	// 		user.addTodo(todo);
	// 	});
	// });

	// Todo.findById(2).then(function(todo){
	// 	return console.log(todo.toJSON());
	// }).catch(function(e){
	// 	console.log('Todo not found');
	// });
});