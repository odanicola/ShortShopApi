module.exports = (sequelize, Sequelize) => {
    const m_categories = sequelize.define('category', {
      category_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      department_id: {
        type: Sequelize.INTEGER
      }
    },{
      tableName: 'category'
    });
    
    return m_categories;
  }
  