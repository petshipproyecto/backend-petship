module.exports = (sequelize, DataType) => {

    const Match = sequelize.define('Match', {
      Id_match: {
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      Id_perfil_origen: {
        type: DataType.BIGINT,
        allowNull: false,
      },
      Id_perfil_destino: {
        type: DataType.BIGINT,
        allowNull: false,
      },
      Id_estado: {
        type: DataType.BIGINT,
        allowNull: false,
      },
      Id_tipo_match: {
        type: DataType.BIGINT,
        allowNull: false,
      },
      createdAt: DataType.DATE,
      updatedAt: DataType.DATE
    });

    Match.init({},{
      timestamps: true,
      sequelize
    });

    Match.associate = (models) => {
        Match.belongsTo(models.Estado, {foreignKey: "Id_estado"});
        Match.belongsTo(models.Tipo_Match, {foreignKey: "Id_tipo_match"});
        Match.belongsTo(models.Perfil, { as: 'Perfil_origen', foreignKey: 'Id_perfil_origen', allowNull: true });
        Match.belongsTo(models.Perfil, { as: 'Perfil_destino', foreignKey: 'Id_perfil_destino', allowNull: true });
    };
  
    return Match;
  };