module.exports = app => {

    const Usuario = app.db.models.Usuario;
    const Ubicacion = app.db.models.Ubicacion;
    const Perfil = app.db.models.Perfil;
  
    app.route('/usuario')
      .get((req, res) => {
        Usuario.findAll({
          include: [
            {model: Ubicacion},
            {model: Perfil}
          ]
        })
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .post((req, res) => {
        Usuario.create(req.body)
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });

      
  
      app.route('/usuario/:Usr_cod')
      .get((req, res) => {
        Usuario.findOne({
          where: req.params,
          include: [
            {model: Ubicacion},
            {model: Perfil}
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
        Usuario.update(req.body, {where: req.params})
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .delete((req, res) => {
        Usuario.destroy({where: req.params})
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(204).json({msg: error.message});
          });
      });
  };
