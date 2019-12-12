module.exports = app => {

    const Provincia = app.db.models.Provincia;
  
    app.route('/provincia')
      .get((req, res) => {
        Provincia.findAll({order: ['Nombre']})
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });
  };