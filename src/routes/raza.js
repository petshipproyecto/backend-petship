module.exports = app => {

  const Raza = app.db.models.Raza;
  const Animal = app.db.models.Animal;

  app.route('/raza')
    .get((req, res) => {
      Raza.findAll({
        include: [
          {model: Animal}
        ]
      })
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    })
    .post((req, res) => {
      Raza.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    });

    app.route('/raza/:Id_raza')
    .get((req, res) => {
      Raza.findOne({
        where: req.params,
        include: [
          {model: Animal}
        ]
      })
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
      Raza.update(req.body, {where: req.params})
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    })
    .delete((req, res) => {
      Raza.destroy({where: req.params})
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(204).json({msg: error.message});
        });
    });
};