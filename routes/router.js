'use strict';

module.exports = function(app) {

    //List Departement
    var departmentRoute = require('../controllers/department');
        app.route('/departments/')
            .get(departmentRoute.index)
        app.route('/departments/:id')
            .get(departmentRoute.detail)

    // List Categories
    var categoriesRoute = require('../controllers/categories');
        app.route('/categories/')
            .get(categoriesRoute.index)
        app.route('/categories/:id')
            .get(categoriesRoute.detail)
        app.route('/categories/inproduct/:id')
            .get(categoriesRoute.inproduct)
        app.route('/categories/indepartment/:id')
            .get(categoriesRoute.indepartment)
}