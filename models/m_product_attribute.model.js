module.exports = (sequelize, Sequelize) => {
    const m_product_attribute = sequelize.define('product_attribute', {
      product_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      attribute_value_id: {
        type: Sequelize.INTEGER,
        primaryKey:true
      },
    },{
      tableName: 'product_attribute',
      underscored: true
    });
    
    return m_product_attribute;
  }
  