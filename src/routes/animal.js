import Sequelize from 'sequelize';

module.exports = app => {
  
  const Animal = app.db.models.Animal;
  const Raza = app.db.models.Raza;

  app.route('/animal')
    .get((req, res) => {
      Animal.findAll({
        include: [{
          model: Raza
        }],
        order: [['Descripcion', 'ASC'], [Raza, 'Descripcion', 'ASC']]
      })
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    })
    .post((req, res) => {
      Animal.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    });

  app.route('/animal/:Id_animal')
    .get((req, res) => {
      Animal.findOne({
        where: req.params,
        include: [{
          model: Raza
        }],
        order: [['Descripcion', 'ASC'], [Raza, 'Descripcion', 'ASC']]
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
      Animal.update(req.body, {where: req.params})
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    })
    .delete((req, res) => {
      Animal.destroy({where: req.params})
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(204).json({msg: error.message});
        });
    });

};