module.exports = (sequelize, Sequelize) => {
    const m_attributes = sequelize.define('attributes', {
      attribute_id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
    },{
      tableName: 'attribute',
      underscored: true
    });
    
    return m_attributes;
  }
  