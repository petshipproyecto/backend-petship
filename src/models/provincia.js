module.exports = (sequelize, DataType) => {

    const Provincia = sequelize.define('Provincia', {
      Id_provincia: {
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      Nombre: {
        type: DataType.STRING(100),
        allowNull: false,
      }
    });

    Provincia.associate = (models) => {
        Provincia.hasMany(models.Localidad, { foreignKey: 'Id_provincia' });
    };
  
    return Provincia;
  };