'use strict';
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define('users', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    profile_pic: DataTypes.STRING,
    password: DataTypes.STRING,
    // adding to try to update handicap
    handicap: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return users;
};