module.exports = (sequelize, Sequelize) => {
    const m_product_category = sequelize.define('product_category', {
      product_id: {
        type: Sequelize.UUID,
      },
      category_id: {
        type: Sequelize.UUID
      }
    },{
      tableName: 'product_category',
      underscored: true
    });
    
    return m_product_category;
  }
  