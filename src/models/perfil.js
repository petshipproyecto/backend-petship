module.exports = (sequelize, DataType) => {

    const Perfil = sequelize.define('Perfil', {
      Id_perfil: {
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      Nombre: {
        type: DataType.STRING(100),
        allowNull: false,
      },
      Edad: {
        type: DataType.INTEGER,
        allowNull: false,
      },
      Imagen: {
        type: DataType.STRING,
        allowNull: false,
      },
    });
  
    Perfil.associate = (models) => {
        Perfil.belongsTo(models.Raza, { foreignKey: 'Id_raza' });
        Perfil.belongsTo(models.Genero, { foreignKey: 'Id_genero'});
        Perfil.belongsTo(models.Usuario, { foreignKey: 'Id_usuario'});
    };
  
    return Perfil;
  };