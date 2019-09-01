module.exports = (sequelize, Sequelize) => {
    const m_attribute_value = sequelize.define('attribute_value', {
      attribute_value_id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      attribute_id: {
        type: Sequelize.INTEGER
      },
      value: {
        type: Sequelize.STRING
      },
    },{
      tableName: 'attribute_value',
      underscored: true
    });
    
    return m_attribute_value;
  }
  