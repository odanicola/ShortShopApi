module.exports = (sequelize, Sequelize) => {
    const m_product = sequelize.define('product', {
      product_id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
    },{
      tableName: 'product',
      underscored: true
    });
    
    return m_product;
  }
  