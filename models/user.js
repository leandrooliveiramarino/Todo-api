module.exports = function(sequelize, DataTypes){
	return sequelize.define('user', {
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [7,100]
			}
		}
	}, {
		hooks: {
			beforeValidate: function(user, options) {
				//user.email and convert to a lower case if it is a string
				if(typeof user.email === 'string')
					user.email = user.email.toLowerCase();
			}
		}
	})

}