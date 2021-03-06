module.exports = (sequelize, DataType) => {

    const Usuario = sequelize.define('Usuario', {
      Id_usuario: {
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      Id_messaging_token: {
        type: DataType.STRING(50),
        allowNull: true,
        unique: true
      },
      Nombre: {
        type: DataType.STRING(20),
        allowNull: false,
      },
      Apellido: {
        type: DataType.STRING(20),
        allowNull: false,
      },
      Email: {
        type: DataType.STRING(30),
        allowNull: false,
      }, 
      Usr_cod: {
        type: DataType.STRING(50),
        allowNull: false,
        unique: true
      },
      Is_admin: {
        type: DataType.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      Latitud: {
        type: DataType.STRING(17),
        allowNull: false
      },
      Longitud: {
        type: DataType.STRING(17),
        allowNull: false
      },
      Imagen: {
        type: DataType.STRING,
        allowNull: true,
      }
    });
  
    Usuario.associate = (models) => {
        Usuario.hasMany(models.Perfil, {foreignKey: "Id_usuario"});
        Usuario.belongsTo(models.Perfil, {as: "Perfil_activo", foreignKey: "Id_perfil_activo", constraints: false});
        Usuario.belongsTo(models.Localidad, {foreignKey: "Id_localidad", constraints: false});
    };
  
    return Usuario;
  };
