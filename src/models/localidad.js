module.exports = (sequelize, DataType) => {

    const Localidad = sequelize.define('Localidad', {
      Id_localidad: {
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      Nombre: {
        type: DataType.STRING(100),
        allowNull: false,
      },
      Latitud: {
        type: DataType.STRING(17),
        allowNull: false,
      },
      Longitud: {
        type: DataType.STRING(17),
        allowNull: false,
      }
    });

    Localidad.associate = (models) => {
        Localidad.belongsTo(models.Provincia, { foreignKey: 'Id_provincia' });
    };
  
    return Localidad;
  };