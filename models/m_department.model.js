module.exports = (sequelize, Sequelize) => {
    const m_department = sequelize.define('department', {
      department_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    },{
      tableName: 'department'
    });
    
    return m_department;
  }
  