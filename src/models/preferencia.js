module.exports = (sequelize, DataType) => {

    const Preferencia = sequelize.define('Preferencia', {
      Id_preferencia: {
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      Interes_macho:{
        type: DataType.BOOLEAN,
        allowNull: true
      },
      Interes_hembra:{
        type: DataType.BOOLEAN,
        allowNull: true
      },
      Edad_min: {
        type: DataType.INTEGER,
        allowNull: false,
      },
      Edad_max: {
        type: DataType.INTEGER,
        allowNull: false,
      },
      Distancia_max: {
        type: DataType.BOOLEAN,
        allowNull: false
      }
    });
  
    Preferencia.associate = (models) => {
        Preferencia.hasOne(models.Perfil, { foreignKey:  'Id_preferencia_pareja', allowNull: true});
        Preferencia.hasOne(models.Perfil, { foreignKey:  'Id_preferencia_amistad', allowNull: true});
        Preferencia.belongsToMany(models.Raza, {through: 'Preferencia_Raza', foreignKey: 'Id_preferencia'});
    };
  
    return Preferencia;
  };
