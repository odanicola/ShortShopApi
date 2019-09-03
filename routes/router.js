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

    //List Attributes
    var attributesRoute = require('../controllers/attributes');
        app.route('/attributes/')
            .get(attributesRoute.index)
        app.route('/attributes/:id')
            .get(attributesRoute.detail)
        app.route('/attributes/values/:id')
            .get(attributesRoute.values)
        app.route('/attributes/inproduct/:id')
            .get(attributesRoute.inproduct)

    // List Products
    var productsRoute = require('../controllers/products')
        app.route('/products/')
            .get(productsRoute.index)
        app.route('/products/search')
            .get(productsRoute.search)
        app.route('/products/:id')
            .get(productsRoute.detail)
        app.route('/products/incategory/:id')
            .get(productsRoute.category)
        app.route('/products/indepartment/:id')
            .get(productsRoute.department)
        app.route('/products/:id/reviews')
            .get(productsRoute.reviews)
}