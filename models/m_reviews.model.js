const sequelizePaginate = require('sequelize-paginate')
module.exports = (sequelize, Sequelize) => {
    const m_reviews = sequelize.define('review', {
      review_id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      customer_id: {
        type: Sequelize.INTEGER
      },
      product_id: {
        type: Sequelize.INTEGER
      },
      review: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.STRING
      },
      created_on: {
        type: Sequelize.STRING
      },
    },{
      tableName: 'review',
      underscored: true
    });
    
    return m_reviews;
  }
  