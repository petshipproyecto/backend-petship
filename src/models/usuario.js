module.exports = (sequelize, DataType) => {

    const Usuario = sequelize.define('Usuario', {
      Id_usuario: {
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      Email: {
        type: DataType.STRING(50),
        allowNull: false,
      },
      Password: {
        type: DataType.STRING(50),
        allowNull: false,
      },      
      Nombre: {
        type: DataType.STRING(50),
        allowNull: false,
      },
      Apellido: {
        type: DataType.STRING(50),
        allowNull: false,
      }
    });
  
    Usuario.associate = (models) => {
        Usuario.belongsTo(models.Ubicacion, {foreignKey: "Id_ubicacion"});
    };
  
    return Usuario;
  };