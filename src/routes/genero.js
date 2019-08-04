module.exports = app => {

    const Genero = app.db.models.Genero;
  
    app.route('/genero')
      .get((req, res) => {
        Genero.findAll({})
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .post((req, res) => {
        Genero.create(req.body)
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });
  
      app.route('/genero/:id')
      .get((req, res) => {
        Genero.findOne({where: req.params})
          .then(result => {
            if (result) {
              res.json(result);
            } else {
              res.sendStatus(404);
            }
          })
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .put((req, res) => {
        Genero.update(req.body, {where: req.params})
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .delete((req, res) => {
        Genero.destroy({where: req.params})
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(204).json({msg: error.message});
          });
      });
  };