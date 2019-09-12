module.exports = (sequelize, DataType) => {

    const Usuario = sequelize.define('Usuario', {
      Id_usuario: {
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true
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
        allowNull: false,
        unique: true
      },
      Imagen: {
        type: DataType.STRING,
        allowNull: true,
      }
    });
  
    Usuario.associate = (models) => {
        Usuario.belongsTo(models.Ubicacion, {foreignKey: "Id_ubicacion"});
        Usuario.hasMany(models.Perfil, {foreignKey: "Id_usuario"});
        Usuario.belongsTo(models.Perfil, {as: "Perfil_actual", foreignKey: "Id_perfil_activo", constraints: false});
    };
  
    return Usuario;
  };
