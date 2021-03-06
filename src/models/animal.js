module.exports = (sequelize, DataType) => {

    const Animal = sequelize.define('Animal', {
      Id_animal: {
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      Descripcion: {
        type: DataType.STRING,
        allowNull: false,
      }
    });
  
    Animal.associate = (models) => {
      Animal.hasMany(models.Raza, {foreignKey: "Id_animal", onDelete: 'cascade', hooks: true})
    };
  
    return Animal;
  };