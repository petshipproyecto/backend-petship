module.exports = (sequelize, DataType) => {

    const Genero = sequelize.define('Genero', {
      Id_genero: {
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      Descripcion: {
        type: DataType.STRING(50),
        allowNull: false,
      }
    });

    Genero.associate = (models) => {
      Genero.hasMany(models.Perfil, {foreignKey: "Id_genero"});
    };
  
    return Genero;
  };