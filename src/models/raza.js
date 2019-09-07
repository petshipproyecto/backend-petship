module.exports = (sequelize, DataType) => {

    const Raza = sequelize.define('Raza', {
      Id_raza: {
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      Descripcion: {
        type: DataType.STRING(100),
        allowNull: false,
      }
    });
  
    Raza.associate = (models) => {
        Raza.belongsTo(models.Animal, {foreignKey: "Id_animal"});
        Raza.hasMany(models.Perfil, {foreignKey: "Id_raza"});
        Raza.belongsToMany(models.Preferencia, {through: 'Preferencia_Raza', foreignKey: 'Id_raza'})
    };
  
    return Raza;
  };