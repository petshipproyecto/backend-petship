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
        Perfil.belongsTo(models.Preferencia, { as: 'PreferenciaPareja', foreignKey: 'Id_preferencia_pareja', allowNull: true });
        Perfil.belongsTo(models.Preferencia, { as: 'PreferenciaAmistad', foreignKey: 'Id_preferencia_amistad', allowNull: true });
        Perfil.hasOne(models.Match, { as: 'PerfilOrigen', foreignKey:  'Id_perfil_origen', allowNull: true});
        Perfil.hasOne(models.Match, { as: 'PerfilDestino', foreignKey:  'Id_perfil_destino', allowNull: true});
    };
  
    return Perfil;
  };
