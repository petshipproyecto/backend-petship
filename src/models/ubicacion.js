module.exports = (sequelize, DataType) => {

    const Ubicacion = sequelize.define('Ubicacion', {
      Id_ubicacion: {
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      Descripcion: {
        type: DataType.STRING(50),
        allowNull: false,
      }
    });
  
    Ubicacion.associate = (models) => {
    };
  
    return Ubicacion;
  };