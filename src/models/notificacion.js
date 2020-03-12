module.exports = (sequelize, DataType) => {

    const Notificacion = sequelize.define('Notificacion', {
      Id_notificacion: {
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      Visto: {
        type: DataType.BOOLEAN,
        allowNull: false,
      }
    },{
        timestamps: true
    });

    Notificacion.associate = (models) => {
        Notificacion.belongsTo(models.Perfil, { foreignKey: 'Id_perfil', onDelete: 'cascade' });
        Notificacion.belongsTo(models.Match, { foreignKey: 'Id_match', onDelete: 'cascade' });
    };
  
    return Notificacion;
  };