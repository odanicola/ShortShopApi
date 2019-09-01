'use strict';

module.exports = function(app) {
    // Auth Controller
    var authRoute = require('../auth/auth');
        app.route('/api/auth/register')
            .post(authRoute.register)

    // Users Controller
    var usersRoute = require('../controllers/users');
        app.route('/api/users')
            .get(usersRoute.index)

        app.route('/api/users/show/:id')
            .get(usersRoute.show)

    //List Departement
    var departmentRoute = require('../controllers/department');
        app.route('/department/')
            .get(departmentRoute.index)
        app.route('/department/:id')
            .get(departmentRoute.detail)

    // List Categories
    var categoriesRoute = require('../controllers/categories');
        app.route('/categories/')
            .get(categoriesRoute.index)
        app.route('/categories/:id')
            .get(categoriesRoute.detail)
}