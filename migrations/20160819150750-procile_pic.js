'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.addColumn('users', 'profile_pic', Sequelize.STRING);

    // .then(function() {
    //   profile_pic.sequelize.query('INSERT INTO users (profile_pic) VALUES (?);')
    // });
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.removeColumn('users', 'profile_pic');
  }
};
