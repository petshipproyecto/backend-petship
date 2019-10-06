module.exports = (sequelize, DataType) => {

    const Estado = sequelize.define('Estado', {
      Id_estado: {
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      Descripcion: {
        type: DataType.STRING(50),
        allowNull: false,
      }
    });

    Estado.associate = (models) => {
        Estado.hasMany(models.Match, {foreignKey: "Id_estado"});
    };
  
    return Estado;
  };