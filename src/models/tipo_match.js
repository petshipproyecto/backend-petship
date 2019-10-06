module.exports = (sequelize, DataType) => {

    const Tipo_Match = sequelize.define('Tipo_Match', {
      Id_tipo_match: {
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      Descripcion: {
        type: DataType.STRING(50),
        allowNull: false,
      }
    });

    Tipo_Match.associate = (models) => {
        Tipo_Match.hasMany(models.Match, {foreignKey: "Id_tipo_match"});
    };
  
    return Tipo_Match;
  };