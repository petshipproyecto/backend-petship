module.exports = app => {

    const Localidad = app.db.models.Localidad;
  
    app.route('/localidad/:Id_provincia')
      .get((req, res) => {
        Localidad.findAll({where: {Id_provincia: req.params.Id_provincia}, order: ['Nombre']})
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });
    
    app.route('/localidad')
      .get((req, res) => {
        Localidad.findAll()
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });
  };