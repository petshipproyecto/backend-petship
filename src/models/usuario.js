module.exports = (sequelize, DataType) => {

    const Usuario = sequelize.define('Usuario', {
      Id_usuario: {
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      Email: {
        type: DataType.STRING(20),
        allowNull: false,
      },
      Password: {
        type: DataType.STRING(20),
        allowNull: false,
      },      
      Nombre: {
        type: DataType.STRING(20),
        allowNull: false,
      },
      Apellido: {
        type: DataType.STRING(20),
        allowNull: false,
      },
      Usr_cod: {
        type: DataType.STRING(50),
        allowNull: true,
        unique: true
      }
    });
  
    Usuario.associate = (models) => {
        Usuario.belongsTo(models.Ubicacion, {foreignKey: "Id_ubicacion"});
        Usuario.hasMany(models.Perfil, {foreignKey: "Id_usuario"});
    };
  
    return Usuario;
  };
