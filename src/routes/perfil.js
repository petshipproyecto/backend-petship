module.exports = app => {

    const Perfil = app.db.models.Perfil;
    const Raza = app.db.models.Raza;
    const Genero = app.db.models.Genero;
    const Usuario = app.db.models.Usuario;
    const Animal = app.db.models.Animal;
  
    app.route('/perfil')
      .get((req, res) => {
        Perfil.findAll({
          include: [
            {
              model: Raza,
              include: [
                {model: Animal}
              ]
            },
            {model: Genero},
            {model: Usuario}
          ]
        })
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .post((req, res) => {
        Perfil.create(req.body)
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });
  
      app.route('/perfil/:Id_perfil')
      .get((req, res) => {
        Perfil.findOne({
          where: req.params,
          include: [
            {
              model: Raza,
              include: [
                {model: Animal}
              ]
            },
            {model: Genero},
            {model: Usuario}
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
        Perfil.update(req.body, {where: req.params})
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .delete((req, res) => {
        Perfil.destroy({where: req.params})
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(204).json({msg: error.message});
          });
      });
  };