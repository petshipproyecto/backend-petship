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
      Interes_pareja: {
        type: DataType.BOOLEAN,
        allowNull: true
      },
      Interes_amistad: {
        type: DataType.BOOLEAN,
        allowNull: true
      },
      Imagen: {
        type: DataType.STRING,
        allowNull: false,
      }
    });

    Perfil.associate = (models) => {
        Perfil.belongsTo(models.Raza, { foreignKey: 'Id_raza' });
        Perfil.belongsTo(models.Genero, { foreignKey: 'Id_genero' });
        Perfil.belongsTo(models.Usuario, { foreignKey: 'Id_usuario' });
        Perfil.belongsTo(models.Preferencia, { as: 'Preferencia_pareja', foreignKey: 'Id_preferencia_pareja', allowNull: true });
        Perfil.belongsTo(models.Preferencia, { as: 'Preferencia_amistad', foreignKey: 'Id_preferencia_amistad', allowNull: true });
        //Perfil.hasMany(models.Usuario, { as: 'Perfil_activo', foreignKey: 'Id_perfil_activo', allowNull: true });
        Perfil.hasMany(models.Match, { as: 'Perfil_origen', foreignKey:  'Id_perfil_origen', allowNull: true});
        Perfil.hasMany(models.Match, { as: 'Perfil_destino', foreignKey:  'Id_perfil_destino', allowNull: true});
    };
  
    return Perfil;
  };
